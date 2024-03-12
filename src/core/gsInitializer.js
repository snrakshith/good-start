import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from "fs";
import { join } from "path";

const projectRoot = process.cwd();
const gsFolder = join(projectRoot, "gs");
const configFilePath = join(gsFolder, "gs.config.js");
const hellFolder = join(projectRoot, ".hell");

// Task 1: Check if the 'gs' folder exists in the project root folder
if (existsSync(gsFolder)) {
  console.log('1. The "gs" folder exists.');

  // Task 2: Check if a 'gs.config.json' file exists inside the 'gs' folder
  if (existsSync(configFilePath)) {
    console.log('2. The "gs.config.js" file exists inside the "gs" folder.');

    // Task 3: Check if the .hell folder exists
    if (!existsSync(hellFolder)) {
      mkdirSync(hellFolder); // Create .hell folder if it doesn't exist
      console.log('3. Created ".hell" folder.');
    }

    // Function to recursively copy files from source folder to destination folder
    function copyFiles(source, destination) {
      const files = readdirSync(source);
      for (const file of files) {
        const sourcePath = join(source, file);
        const destinationPath = join(destination, file);
        if (statSync(sourcePath).isDirectory()) {
          // Recursively copy files from subdirectories
          copyFiles(sourcePath, destination);
        } else {
          // Skip copying gs.config.json file
          if (file !== "gs.config.js" && file !== ".gitignore") {
            // Copy files to .hell folder
            copyFileSync(sourcePath, destinationPath);
            console.log(`Copied "${file}" to ".hell" folder.`);
          }
        }
      }
    }

    // Start copying files recursively from gs folder to .hell folder
    copyFiles(gsFolder, hellFolder);
  } else {
    console.log(
      '2. Error: "gs.config.js" file does not exist inside the "gs" folder.'
    );
  }
} else {
  console.log(
    '1. Error: "gs" folder does not exist in the project root folder.'
  );
}
