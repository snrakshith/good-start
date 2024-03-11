import fse from "fs-extra";
import { join } from "path";

// Assuming this script is located in the root of your project
const projectRoot = process.cwd();
const hellFolder = join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fse.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Delete .hell folder
if (hellFolder) {
  fse.remove(hellFolder);
  console.log(`.hell folder also removed from project successfully`);
} else {
  console.error(`Error removing ${file}:`, err);
}
