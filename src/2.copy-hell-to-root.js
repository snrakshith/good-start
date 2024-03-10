const fs = require("fs-extra");
const path = require("path");

const projectRoot = process.cwd(); // Assuming this script is located in the root of your project
const hellFolder = path.join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fs.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Copy contents of .hell folder to project root
fs.copy(hellFolder, projectRoot)
  .then(() =>
    console.log("Contents of .hell folder copied to project root successfully")
  )
  .catch((err) => console.error("Error copying contents:", err));
