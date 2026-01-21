import React, { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

const TILE_BLOCKED = 0;
const TILE_GROUND = 1;
const TILE_WATER = 2;

const COLORS = {
  [TILE_BLOCKED]: "#A0522D",
  [TILE_GROUND]: "#39ff14",
  [TILE_WATER]: "#00d4ff",
};

export default function GridDemo() {
  const canvasRef = useRef(null);
  const [gridData, setGridData] = useState(null);
  const [objectSize, setObjectSize] = useState(0);
  const [mouseDown, setMouseDown] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState(null);
  const [connectedAreas, setConnectedAreas] = useState([]);
  const [pathData, setPathData] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const lastFetchTimeRef = useRef(0);
  const fetchTimeoutRef = useRef(null);

  // Load the map from backend
  useEffect(() => {
    let retries = 0;
    const maxRetries = 5;

    const fetchGrid = async () => {
      try {
        const res = await fetch(`${API}/api/grid`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data && data.tiles && data.width && data.height) {
          setGridData(data);
        } else {
          throw new Error("Invalid grid data");
        }
      } catch (err) {
        console.error("Failed to load grid:", err);
        if (retries < maxRetries) {
          retries++;
          setTimeout(fetchGrid, 1000 * Math.pow(2, retries - 1)); // Exponential backoff
        }
      }
    };

    fetchGrid();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !gridData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height, tiles } = gridData;

    const tileWidth = canvas.width / width;
    const tileHeight = canvas.height / height;

    const drawTile = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);

      // Draw border
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    };

    const drawBlock = (x, y, size, color) => {
      for (let i = 0; i <= size; i++) {
        for (let j = 0; j <= size; j++) {
          if (x + j < width && y + i < height) {
            drawTile(x + j, y + i, color);
          }
        }
      }
    };

    // Clear
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw tiles
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];
        drawTile(x, y, COLORS[tile]);
      }
    }

    // Draw based on mode
    if (mode === "pathfind" && mouseDown && pathData) {
      const [x0, y0] = mouseDown;
      const x1 = mousePos.x;
      const y1 = mousePos.y;

      if (
        pathData.connected &&
        pathData.path &&
        Array.isArray(pathData.path) &&
        pathData.path.length > 0
      ) {
        // Draw path in yellow (except start and end)
        for (const posStr of pathData.path) {
          const [x, y] = posStr.split(",").map(Number);
          if ((x !== x0 || y !== y0) && (x !== x1 || y !== y1)) {
            drawBlock(x, y, objectSize, "#ffff00");
          }
        }
        // Draw start in white
        drawBlock(x0, y0, objectSize, "#ffffff");
        // Draw end in white
        drawBlock(x1, y1, objectSize, "#ffffff");
      } else {
        // Draw in red if no path
        drawBlock(x0, y0, objectSize, "#ff0000");
        drawBlock(x1, y1, objectSize, "#ff0000");
      }
    } else if (mode === "connected" && mouseDown && connectedAreas.length > 0) {
      const [x0, y0] = mouseDown;

      for (const posStr of connectedAreas) {
        const [x, y] = posStr.split(",").map(Number);
        if (x !== x0 || y !== y0) {
          drawBlock(x, y, objectSize, "#ffff00");
        }
      }

      drawBlock(x0, y0, objectSize, "#ffffff");
    } else {
      // Just show cursor
      drawBlock(mousePos.x, mousePos.y, objectSize, "#ffffff");
    }
  }, [
    gridData,
    objectSize,
    mouseDown,
    mousePos,
    mode,
    pathData,
    connectedAreas,
  ]);

  const getGridPos = (e) => {
    if (!canvasRef.current || !gridData) return [0, 0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(
      ((e.clientX - rect.left) / rect.width) * gridData.width,
    );
    const y = Math.floor(
      ((e.clientY - rect.top) / rect.height) * gridData.height,
    );
    const maxX = Math.max(0, gridData.width - objectSize - 1);
    const maxY = Math.max(0, gridData.height - objectSize - 1);
    return [Math.min(x, maxX), Math.min(y, maxY)];
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setMode("pathfind");
      setMouseDown(getGridPos(e));
    } else if (e.button === 2) {
      e.preventDefault();
      setMode("connected");
      setMouseDown(getGridPos(e));
    } else if (e.button === 1) {
      setObjectSize((s) => (s + 1) % 3);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(null);
    setMode(null);
    setPathData(null);
    setConnectedAreas([]);
    // Reset throttle on mouse up
    lastFetchTimeRef.current = 0;
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = null;
    }
  };

  const handleMouseMove = (e) => {
    const [x, y] = getGridPos(e);
    setMousePos({ x, y });

    // Throttle API requests to max 1 per 50ms for responsive feel
    if (mouseDown && mode && Date.now() - lastFetchTimeRef.current > 50) {
      lastFetchTimeRef.current = Date.now();
      const [x0, y0] = mouseDown;

      if (mode === "pathfind") {
        fetch(`${API}/api/grid/findpath`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            size: objectSize,
            x0,
            y0,
            x1: x,
            y1: y,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && typeof data.connected === "boolean") {
              setPathData(data);
            }
          })
          .catch((err) => console.error("Pathfind error:", err));
      } else if (mode === "connected") {
        fetch(`${API}/api/grid/isconnected`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            size: objectSize,
            x0,
            y0,
            x1: x,
            y1: y,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && Array.isArray(data.areas)) {
              setConnectedAreas(data.areas);
            }
          })
          .catch((err) => console.error("Connected error:", err));
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setObjectSize((s) => Math.min(2, s + 1));
    } else {
      setObjectSize((s) => Math.max(0, s - 1));
    }
  };

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="relative">
        {gridData ? (
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full max-w-3xl mx-auto bg-dark-900 border-2 border-primary/30 rounded-lg cursor-crosshair block shadow-lg"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="w-full max-w-3xl mx-auto h-96 bg-dark-900 border-2 border-primary/30 rounded-lg flex items-center justify-center">
            <p className="text-primary/50">
              Loading C++ grid data from server...
            </p>
          </div>
        )}
      </div>

      {/* Collapsible Controls */}
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-full px-4 py-2 bg-dark-900/50 hover:bg-dark-900/80 text-primary font-semibold rounded-lg transition-colors duration-200 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">Controls & Legend</span>
          </span>
          <span
            className={`transition-transform duration-300 ${showControls ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        {showControls && (
          <div className="mt-3 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2 text-sm">
                  Interactions:
                </h4>
                <ul className="text-sm text-dark-300 space-y-1">
                  <li>
                    <strong>Left Drag:</strong> Find shortest path
                  </li>
                  <li>
                    <strong>Right Click:</strong> Show connected areas
                  </li>
                  <li>
                    <strong>Middle Click:</strong> Cycle object size
                  </li>
                  <li>
                    <strong>Scroll:</strong> Change object size
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2 text-sm">
                  Tiles:
                </h4>
                <ul className="text-sm text-dark-300 space-y-1">
                  <li>
                    <span className="inline-block w-3 h-3 bg-green-400 rounded mr-2"></span>
                    Ground (walkable)
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-cyan-400 rounded mr-2"></span>
                    Water (obstacles)
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-amber-700 rounded mr-2"></span>
                    Bridges (blocked)
                  </li>
                  <li>
                    <span className="inline-block w-3 h-3 bg-yellow-400 rounded mr-2"></span>
                    Path (result)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
