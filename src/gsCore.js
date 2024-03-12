import { resolve } from "path";
import { executeCommand } from "./utils/execute-command.js";

const projectRoot = process.cwd();
const scriptPath = resolve(projectRoot, "./scripts/update_gitignore.sh");

// Function to run scripts sequentially
async function runScripts() {
  try {
    // Run gs.js
    console.log("Running good start initializer...");
    await executeCommand("node ./src/core/gsInitializer.js");
    console.log("gs.js completed.");

    // Run ctr.js
    console.log("Running copy to root...");
    await executeCommand("node ./src/core/copyToRoot.js");
    console.log("ctr.js completed.");

    // Run update_gitignore.sh
    console.log("Running update gitignore...");
    await executeCommand(scriptPath);
    console.log("update_gitignore.sh completed.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Run the scripts sequentially
runScripts();
