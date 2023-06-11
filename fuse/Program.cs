using System.Text.Json;
using System.Text.Json.Nodes;

// Notes for me
// - Adding a custom tool in VS (for running batch file): https://stackoverflow.com/a/5606276
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
	//          output: "./build/out.js"  <-- Single string
	//       },
	//       {
	//          input: [                  <-- Array of one string (effectively a rename)
	//              "./src/rename.js"
	//          ],
	//          output: "./build/done.js" <-- Single string
	//       }
	//   ]
	// }


	internal class Program
	{
		static void Log(string message)
		{
			string now = DateTime.Now.ToString();
			Console.WriteLine($"{now}: {message}");
		}

		static void Main(string[] args)
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
				}
				catch (Exception e)
				{
					Log($"Error fusing input files into output file: {e.Message}; skipping fuse");
					errorCount++;
					continue;
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
	}
}