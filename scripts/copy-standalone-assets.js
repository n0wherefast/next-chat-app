const fs = require("node:fs");
const path = require("node:path");

const standalonePath = path.join(".next", "standalone");
const standaloneNextPath = path.join(standalonePath, ".next");
const staticPath = path.join(".next", "static");

if (!fs.existsSync(staticPath)) {
  throw new Error("Next.js static build assets were not found.");
}

fs.mkdirSync(standaloneNextPath, { recursive: true });
fs.cpSync(staticPath, path.join(standaloneNextPath, "static"), { recursive: true });

const publicPath = "public";
if (fs.existsSync(publicPath)) {
  fs.cpSync(publicPath, path.join(standalonePath, "public"), { recursive: true });
}
