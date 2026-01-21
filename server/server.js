import express from "express";
import cors from "cors";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const gridBinary = path.join(__dirname, "../cpp_folder/gridserver");
const mapPath = path.join(__dirname, "../cpp_folder");

// Cache grid data
let gridCache = null;

function getGridData() {
  if (gridCache) return gridCache;

  try {
    const output = execSync(`cd "${mapPath}" && "${gridBinary}" grid`, {
      encoding: "utf-8",
      timeout: 5000,
    });

    const data = JSON.parse(output.trim());
    gridCache = data;
    return gridCache;
  } catch (err) {
    console.error("Error loading grid:", err.message);
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
