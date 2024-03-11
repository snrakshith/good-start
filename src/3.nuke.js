import fse from "fs-extra";
import { join } from "path";

const projectRoot = process.cwd(); // Assuming this script is located in the root of your project
const hellFolder = join(projectRoot, ".hell");

// Check if .hell folder exists
if (!fse.existsSync(hellFolder)) {
  console.log(".hell folder does not exist");
  process.exit(1);
}

// Get a list of files in the project root
fse.readdir(projectRoot, (err, files) => {
  if (err) {
    console.error("Error reading project root:", err);
    process.exit(1);
  }

  // Filter out files that were copied from .hell folder
  const filesToRemove = files.filter((file) =>
    fse.existsSync(join(hellFolder, file))
  );

  // Delete each file
  filesToRemove.forEach((file) => {
    const filePath = join(projectRoot, file);
    fse.remove(filePath, (err) => {
      if (err) {
        console.error(`Error removing ${file}:`, err);
      } else {
        console.log(`${file} removed from project root successfully`);
        // fse.remove(hellFolder);
        // console.log(`.hell folder also removed from project successfully`);
      }
    });
  });
});
