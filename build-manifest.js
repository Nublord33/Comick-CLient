const fs = require("fs");

const target = process.argv[2]; // "chrome" or "firefox"
if (!target) {
  console.error("Usage: node build-manifest.js <chrome|firefox>");
  process.exit(1);
}

// Load shared manifest
const sharedManifest = JSON.parse(fs.readFileSync("manifest.shared.json", "utf8"));

// Load browser-specific manifest
const targetManifestPath = `manifest.${target}.json`;
if (!fs.existsSync(targetManifestPath)) {
  console.error(`Error: ${targetManifestPath} does not exist.`);
  process.exit(1);
}
const targetManifest = JSON.parse(fs.readFileSync(targetManifestPath, "utf8"));

// Merge shared + target-specific settings
const finalManifest = { ...sharedManifest, ...targetManifest };

// Write final manifest.json
fs.writeFileSync("manifest.json", JSON.stringify(finalManifest, null, 2));
console.log(` ${target} generated`);
