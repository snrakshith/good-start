import { executeCommand } from "./utils/execute-command.js";

// Function to run scripts sequentially
async function runScripts() {
  try {
    // Run nuke.js
    console.log("Running nuke.js...");
    await executeCommand("node ./src/core/removeFromRoot.js");
    console.log("Nuke completed.");

    // Run clean-cache.js
    console.log("Running clean cache...");
    await executeCommand("node ./src/core/cleanCache.js");
    console.log("Clean cache completed.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Run the scripts sequentially
runScripts();
