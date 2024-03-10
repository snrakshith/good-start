const fs = require("fs-extra");
const path = require("path");

const projectRoot = process.cwd(); // Assuming this script is located in the root of your project
const hellFolder = path.join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fs.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Get a list of files in the project root
fs.readdir(projectRoot, (err, files) => {
  if (err) {
    console.error("Error reading project root:", err);
    process.exit(1);
  }

  // Filter out files that were copied from .hell folder
  const filesToRemove = files.filter((file) =>
    fs.existsSync(path.join(hellFolder, file))
  );

  // Delete each file
  filesToRemove.forEach((file) => {
    const filePath = path.join(projectRoot, file);
    fs.remove(filePath, (err) => {
      if (err) {
        console.error(`Error removing ${file}:`, err);
      } else {
        console.log(`${file} removed from project root successfully`);
      }
    });
  });
});
