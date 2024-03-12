import { writeFileSync } from "fs";
import { resolve } from "path";
import config from "../../gs/gs.config.js";
import packageJson from "../../package.json" assert { type: "json" };

// Know project root
const projectRoot = process.cwd();

// Generate pre and post scripts based on the configuration
const preScripts = {};
const postScripts = {};
config.runs_on.default.forEach((command) => {
  preScripts[`pre${command}`] = config.runs_on.scripts.pre;
  postScripts[`post${command}`] = config.runs_on.scripts.post;
});

// run on custom commands
config.runs_on.extends.cmd.forEach((command) => {
  preScripts[`pre${command}`] = config.runs_on.scripts.pre;
  postScripts[`post${command}`] = config.runs_on.scripts.post;
});

// Update package.json with pre and post scripts
const packageJsonPath = resolve(projectRoot, "package.json");
packageJson.scripts = {
  gsCache: "node ./src/core/clearCache.js",
  updatePkg: "node -e \"require('gs').updatePkg()\"",
  ...packageJson.scripts,
  ...preScripts,
  ...postScripts,
};

// Write updated package.json back to file
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("package.json updated successfully.");
