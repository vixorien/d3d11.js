using System.Text.Json;

namespace Fuse
{
	/// <summary>
	/// Information from a fuse configuration file
	/// </summary>
	internal class FuseConfig
	{
		/// <summary>
		/// Gets or sets an array of input files
		/// </summary>
		public string[] Inputs { get; set; }

		/// <summary>
		/// Gets or sets the output file
		/// </summary>
		public string Output { get; set; }
	}

	internal class Program
	{
		static void Main(string[] args)
		{
			string now = DateTime.Now.ToString();

			// Need a single argument: the config file
			if (args.Length == 0)
			{
				Console.WriteLine($"{now}: No configuration file specified; exiting");
				return;
			}

			// Got it
			string file = args[0];
			if (!File.Exists(file))
			{
				Console.WriteLine($"{now}: Specified configuration file '{file}' not found; exiting");
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
					new JsonSerializerOptions{ PropertyNameCaseInsensitive = true });
			}
			catch (Exception e)
			{
				Console.WriteLine($"{now}: Error deserializing json config file: {e.Message}");
				return;
			}

			// Check the results
			if (config.Inputs == null || config.Inputs.Length == 0)
			{
				Console.WriteLine($"{now}: No input files specified; exiting");
				return;
			}

			if (config.Output == null || config.Output.Length == 0)
			{
				Console.WriteLine($"{now}: No output file specified; exiting");
				return;
			}

			try
			{
				// Read all of the text of each input file and concatenate
				string combined = "";
				foreach (string input in config.Inputs)
				{
					combined += File.ReadAllText(path + "/" + input);
					combined += Environment.NewLine;
					combined += Environment.NewLine;
				}

				File.WriteAllText(path + "/" + config.Output, combined);
			}
			catch (Exception e)
			{
				Console.WriteLine($"{now}: Error combining input files into output file: {e.Message}");
				return;
			}
		}
	}
}