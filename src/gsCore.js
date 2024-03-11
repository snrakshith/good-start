import { exec } from "child_process";
import { resolve } from "path";

const projectRoot = process.cwd();
const scriptPath = resolve(projectRoot, "./scripts/update_gitignore.sh");

// Function to execute a command
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

// Function to run scripts sequentially
async function runScripts() {
  try {
    // Run gs.js
    console.log("Running gs.js...");
    await executeCommand("node ./src/1.gs.js");
    console.log("gs.js completed.");

    // Run ctr.js
    console.log("Running ctr.js...");
    await executeCommand("node ./src/2.copy-hell-to-root.js");
    console.log("ctr.js completed.");

    // Run update_gitignore.sh
    console.log("Running update_gitignore.sh...");
    await executeCommand(scriptPath);
    console.log("update_gitignore.sh completed.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Run the scripts sequentially
runScripts();
