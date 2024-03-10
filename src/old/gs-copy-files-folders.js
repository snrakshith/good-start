const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const gsFolder = path.join(projectRoot, "gs");
const configFilePath = path.join(gsFolder, "gs.config.json");
const hellFolder = path.join(projectRoot, ".hell");

// Task 1: Check if the 'gs' folder exists in the project root folder
if (fs.existsSync(gsFolder)) {
  console.log('1. The "gs" folder exists.');

  // Task 2: Check if a 'gs.config.json' file exists inside the 'gs' folder
  if (fs.existsSync(configFilePath)) {
    console.log('2. The "gs.config.json" file exists inside the "gs" folder.');

    // Task 3: Create a copy of the files in another folder called '.hell'
    if (!fs.existsSync(hellFolder)) {
      fs.mkdirSync(hellFolder); // Create .hell folder if it doesn't exist
      console.log('3. Created ".hell" folder.');
    }

    // Function to recursively copy files and folders
    function copyFiles(source, destination) {
      const files = fs.readdirSync(source);
      for (const file of files) {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);
        if (fs.statSync(sourcePath).isDirectory()) {
          fs.mkdirSync(destinationPath);
          copyFiles(sourcePath, destinationPath); // Recursive call for subdirectories
        } else {
          fs.copyFileSync(sourcePath, destinationPath);
          console.log(`   Copied "${file}" to ".hell" folder.`);
        }
      }
    }

    // Start copying files recursively
    copyFiles(gsFolder, hellFolder);
  } else {
    console.log(
      '2. Error: "gs.config.json" file does not exist inside the "gs" folder.'
    );
  }
} else {
  console.log(
    '1. Error: "gs" folder does not exist in the project root folder.'
  );
}
