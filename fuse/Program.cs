using NUglify.JavaScript;
using System.Text.Json;
using System.Text.Json.Nodes;

// Notes for me
// - Adding a custom tool in VS (for running batch file): https://stackoverflow.com/a/5606276
//
// - Create an external tool called "Run batch file"
//    - Set the Command to: CMD.EXE
//    - Set the Arguments to: / c "$(ItemPath)"
//    - Set the Initial directory to: $(ItemDir)
//    - Check the "use output window" checkbox and then Apply to create the command
//    - Note where the new command appeared in the list of commands. The external commands are numbered from 1 starting below the divider bar. #1 is usually "Create GUID"
//    - Now go to Tools -> Customize and select the commands tab.

// - Select the Context menu radio button and select "Project and Solution Context menus | Item" from the dropdown. ("WEB ITEM" for web projects!!!)
//    - Now use "Add Command..." to add a new command
//    - In the Categories list select "Tools"
//    - From the commands select the "External Command #" that corresponds to the position of the "Run Batch file" custom command you noted the number of in step 5 above.
//    - Move it to the correct position in the list add keyboard shortcuts etc.
//    - Close the dialog.
namespace Fuse
{
	/// <summary>
	/// A single fuse task that takes one or more input files
	/// and combines them into a single output file
	/// </summary>
	internal class FuseTask
	{
		public string[] Input { get; set; }
		public string Output { get; set; }
		public bool Minify { get; set; }
	}

	/// <summary>
	/// Information from a fuse configuration file
	/// </summary>
	internal class FuseConfig
	{
		public FuseTask[] Fuse { get; set; }
	}

	// Config file syntax
	//
	// {
	//   fuse: [                         <-- Array of fuse objects
	//       {
	//          input: [                 <-- Array of strings
	//             "./src/fuseMe1.js",
	//             "./src/fuseMe2.js",
	//             "./src/fuseMe3.js",
	//             "./src/fuseMe4.js",
	//          ],
	//          output: "./build/out.js",  <-- Single string
	//			minify: true               <-- bool, optional (default is false)
	//       },
	//       {
	//          input: [                  <-- Array of one string (effectively a rename or copy)
	//              "./src/rename.js"
	//          ],
	//          output: "./build/done.js" <-- Single string
	//       },
	//       {
	//          input: [                  <-- Array of one folder
	//              "./src/"
	//          ],
	//          output: "./build/"       <-- Single folder string
	//   ]
	// }


	internal class Program
	{
		// Just need one
		static HttpClient client = new HttpClient();

		static void Log(string message)
		{
			string now = DateTime.Now.ToString();
			Console.WriteLine($"{now}: {message}");
		}

		static async Task Main(string[] args)
		{
			// Need a single argument: the config file
			if (args.Length == 0)
			{
				Log("No configuration file specified; exiting");
				return;
			}

			// Got it
			string file = args[0];
			if (!File.Exists(file))
			{
				Log($"Specified configuration file '{file}' not found; exiting");
				return;
			}

			// Get path info
			string filePath = Path.GetFullPath(file);
			string path = Path.GetDirectoryName(filePath);

			// Read and deserialize the JSON
			string configText = File.ReadAllText(filePath);
			FuseConfig config = null;
			try
			{
				config = JsonSerializer.Deserialize<FuseConfig>(
					configText,
					new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
			}
			catch (Exception e)
			{
				Log($"Error deserializing json config file: {e.Message}");
				return;
			}

			// Did we get anything useful?
			if (config.Fuse == null || config.Fuse.Length == 0)
			{
				Log("Config file contains no fuse tasks; exiting");
				return;
			}

			// Handle each fuse, one at a time
			int errorCount = 0;
			foreach (FuseTask f in config.Fuse)
			{
				if (f.Input == null || f.Input.Length == 0)
				{
					Log("No input files specified; skipping fuse");
					errorCount++;
					continue;
				}

				if (f.Output == null || f.Output.Length == 0)
				{
					Log("No output file specified; skipping fuse");
					errorCount++;
					continue;
				}

				// Is this a folder copy?
				if (f.Input.Length == 1 && Directory.Exists(f.Input[0]))
				{
					// Input is a folder, so output must be too
					if (!Directory.Exists(f.Output))
					{
						Log($"Input is a folder, but output is not; skipping fuse");
						errorCount++;
						continue;
					}

					// Get a listing of all files in the specified folder
					string[] files = null;
					try
					{
						files = Directory.GetFiles(f.Input[0]);
					}
					catch (Exception e)
					{
						Log($"Error copying input folder contents into output folder: {e.Message}; skipping fuse");
						errorCount++;
						continue;
					}

					// Copy each file, one by one
					foreach (string fileToCopy in files)
					{
						try
						{
							// Isolate the file name
							string fileNameOnly = Path.GetFileName(fileToCopy);
							File.Copy(fileToCopy, Path.Combine(f.Output, fileNameOnly), true);
						}
						catch (Exception e)
						{
							Log($"Error copying input folder contents into output folder: {e.Message}; skipping fuse");
							errorCount++;
							continue;
						}
					}
				}
				else
				{
					// We have what we need, attempt the fuse
					try
					{
						// Read all of the text of each input file and concatenate
						string combined = "";
						foreach (string input in f.Input)
						{
							combined += File.ReadAllText(path + "/" + input);
							combined += Environment.NewLine;
							combined += Environment.NewLine;
						}

						File.WriteAllText(path + "/" + f.Output, combined);

						// Also attempt to minify if necessary
						if (f.Minify)
						{
							string minFile = GetMinifiedFilename(f.Output);
							//string minJS = NUglify.Uglify.Js(combined).Code; // Needs more testing - output may be malformed?
							string minJS = await Minify(combined);
							File.WriteAllText(path + "/" + minFile, minJS);
						}
					}
					catch (Exception e)
					{
						Log($"Error fusing input files into output file: {e.Message}; skipping fuse");
						errorCount++;
						continue;
					}
				}

				Log("Fuse completed");
			}

			// Log results starting with a blank line
			Log("");
			if (errorCount == 0)
			{
				Log("All fuses completed successfully");
			}
			else if (errorCount < config.Fuse.Length)
			{
				Log("Some fuses completed successfully; see above");
			}
			else
			{
				Log("All fuses failed; see above");
			}
		}

		static string GetMinifiedFilename(string filename)
		{
			string path = Path.GetDirectoryName(filename);
			string noExt = Path.GetFileNameWithoutExtension(filename);
			string ext = Path.GetExtension(filename);

			return
				(string.IsNullOrEmpty(path) ? "" : path + "/") +
				noExt + ".min" + ext;
		}

		static async Task<string> Minify(string js)
		{
			// Data key/value pair to send and the encoded version
			Dictionary<string, string> data = new Dictionary<string, string>() { { "input", js } };
			FormUrlEncodedContent content = new FormUrlEncodedContent(data);

			// Perform the post and grab the response
			HttpResponseMessage response = await client.PostAsync("https://www.toptal.com/developers/javascript-minifier/api/raw", content);
			return await response.Content.ReadAsStringAsync();
		}
	}
}