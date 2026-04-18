import { spawnSync } from "node:child_process";

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function parseMajor(version) {
  const major = Number(String(version).split(".")[0]);
  return Number.isFinite(major) ? major : null;
}

const nodeMajor = parseMajor(process.versions.node);
if (nodeMajor === null) {
  fail(`Could not parse Node.js version: ${process.versions.node}`);
} else if (nodeMajor >= 22) {
  fail(
    `Node.js ${process.versions.node} detected. This project expects Node.js 18–21; Node.js 20 LTS is recommended.`
  );
}

const child = spawnSync(
  process.execPath,
  ["-e", "console.log('child ok')"],
  { stdio: ["pipe", "pipe", "pipe"] }
);

if (child.error) {
  if (child.error.code === "EPERM") {
    fail(
      "Your Node.js environment cannot spawn child processes with piped stdio (spawn EPERM). Vite/esbuild require this.\n" +
        "Fix: switch to Node.js 20 LTS and reinstall dependencies (`npm install`). If it still fails, check antivirus/endpoint policies."
    );
  } else {
    fail(`Child-process check failed: ${child.error.code || child.error.message}`);
  }
} else {
  process.stdout.write(child.stdout || "");
  console.log("Doctor OK");
}

