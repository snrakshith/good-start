const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const hellFolder = path.join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fs.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Read files in .hell folder
fs.readdir(hellFolder, (err, files) => {
  if (err) {
    console.error("Error reading .hell folder:", err);
    process.exit(1);
  }

  // Move each file to the root of the project path
  files.forEach((file) => {
    const sourcePath = path.join(hellFolder, file);
    const destinationPath = path.join(projectRoot, file);

    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Error moving ${file}:`, err);
      } else {
        console.log(`${file} moved successfully to ${projectRoot}`);
      }
    });
  });
});
