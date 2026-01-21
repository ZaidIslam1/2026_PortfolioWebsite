import express from "express";
import cors from "cors";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL, // set this on Render
      "http://localhost:3000",
      "http://localhost:5173",
    ].filter(Boolean),
  }),
);

app.use(express.json());

app.get("/", (req, res) =>
  res.send("Backend is live. Try /health or /api/grid"),
);
app.get("/health", (req, res) => res.status(200).send("ok"));

app.get("/debug", (req, res) => {
  res.json({
    cwd: process.cwd(),
    __dirname,
    PORT,
    gridBinary,
    mapPath,
    gridBinaryExists: fs.existsSync(gridBinary),
    mapPathExists: fs.existsSync(mapPath),
    cppFolderList: fs.existsSync(mapPath)
      ? fs.readdirSync(mapPath).slice(0, 50)
      : null,
  });
});

const gridBinary = path.join(__dirname, "../cpp_folder/gridserver");
const mapPath = path.join(__dirname, "../cpp_folder");

// Cache grid data
let gridCache = null;

function getGridData() {
  if (gridCache) return gridCache;

  try {
    if (!fs.existsSync(gridBinary)) {
      throw new Error(`gridBinary not found at: ${gridBinary}`);
    }
    if (!fs.existsSync(mapPath)) {
      throw new Error(`mapPath not found at: ${mapPath}`);
    }

    const output = execSync(`cd "${mapPath}" && "${gridBinary}" grid`, {
      encoding: "utf-8",
      timeout: 15000,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const trimmed = output.trim();

    // If your C++ prints extra logs, JSON.parse will fail.
    const data = JSON.parse(trimmed);

    gridCache = data;
    return gridCache;
  } catch (err) {
    const stdout = err?.stdout?.toString?.() || "";
    const stderr = err?.stderr?.toString?.() || "";

    console.error("Error loading grid:", err.message);
    if (stdout) console.error("stdout:", stdout);
    if (stderr) console.error("stderr:", stderr);

    return null;
  }
}

// API endpoint to get grid map
app.get("/api/grid", (req, res) => {
  const grid = getGridData();
  if (!grid) {
    return res.status(500).json({ error: "Failed to load grid map" });
  }
  res.json(grid);
});

// Check connectivity between two positions (using C++)
app.post("/api/grid/isconnected", (req, res) => {
  try {
    const { size, x0, y0, x1, y1 } = req.body;

    const output = execSync(
      `cd "${mapPath}" && "${gridBinary}" connected ${size} ${x0} ${y0} ${x1} ${y1}`,
      { encoding: "utf-8", timeout: 200 },
    );

    const connected = output.trim() === "1";
    res.json({
      connected,
      areas: [],
    });
  } catch (error) {
    console.error("Connected error:", error.message);
    res.status(500).json({
      error: "Connection check failed",
      connected: false,
      areas: [],
    });
  }
});

// A* pathfinding endpoint (using C++)
app.post("/api/grid/findpath", (req, res) => {
  try {
    const { size, x0, y0, x1, y1 } = req.body;

    const output = execSync(
      `cd "${mapPath}" && "${gridBinary}" findpath ${size} ${x0} ${y0} ${x1} ${y1}`,
      { encoding: "utf-8", timeout: 200 },
    );

    const result = JSON.parse(output.trim());
    res.json(result);
  } catch (error) {
    console.error("Pathfinding error:", error.message);
    res.status(500).json({
      error: "Pathfinding failed",
      path: [],
      connected: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎮 Grid server running on http://localhost:${PORT}`);
  console.log(`📍 Using C++ binary: ${gridBinary}`);
});
