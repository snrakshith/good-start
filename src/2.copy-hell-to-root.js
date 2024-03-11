import fse from "fs-extra";
import { join } from "path";

const projectRoot = process.cwd(); // Assuming this script is located in the root of your project
const hellFolder = join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fse.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Copy contents of .hell folder to project root
fse
  .copy(hellFolder, projectRoot)
  .then(() =>
    console.log("Contents of .hell folder copied to project root successfully")
  )
  .catch((err) => console.error("Error copying contents:", err));
