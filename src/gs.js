import yargs from "yargs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeCommand } from "./utils/execute-command.js";

const { mkdir } = fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(process.argv.slice(2))
  .command("init", "Initialize sample folders and files", (yargs) => {
    yargs
      .option("default", {
        describe: "Copy default template folder",
        type: "boolean",
      })
      .option("clean", {
        describe: "Copy clean template folder",
        type: "boolean",
      })
      .conflicts("default", "clean") // Ensure only one of default or clean options can be provided
      .check((argv) => {
        if (!argv.default && !argv.clean) {
          throw new Error("Please provide either --default or --clean option");
        }
        return true;
      });
  })
  .option("start", {
    describe: "Run gsCore.js file in src folder",
    type: "boolean",
  })
  .option("update-package", {
    describe: "Run updatePackage.js file in the core subfolder of src folder",
    type: "boolean",
  })
  .option("nuke", {
    describe: "Run nukeCore.js file in the src folder",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

async function main() {
  try {
    const rootDir = process.cwd();

    if (argv._.includes("init")) {
      const templateFolder = argv.default ? "default" : "clean"; // Use default or clean based on provided options
      await copySampleFolders(rootDir, templateFolder);
      console.log("Initialization completed successfully.");
    } else if (argv.start) {
      await executeCommand("node ./src/gsCore.js");
    } else if (argv["update-package"]) {
      await executeCommand("node ./src/core/updatePackage.js");
    } else if (argv.nuke) {
      await executeCommand("node ./src/nukeCore.js");
    } else {
      console.log(
        'Please provide a valid command. Use "--help" for usage information.'
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

async function copySampleFolders(rootDir, templateFolder) {
  // Path to the template folder (default or clean)
  const templateFolderPath = path.join(
    __dirname,
    "..",
    "templates",
    templateFolder
  );

  // Copy the template folder to the root directory
  await copyFolder(templateFolderPath, rootDir);
}

async function copyFolder(source, destination) {
  await mkdir(destination, { recursive: true });

  const entries = await fs.promises.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

main();
