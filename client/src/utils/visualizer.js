import { Grid } from "./grid";

/**
 * Canvas-based Grid Visualization - Matches TestGrid.cpp behavior exactly
 */
export class GridVisualizer {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.grid = new Grid(width, height);
    this.objectSize = 0;

    this.mouseLeft = false;
    this.mouseRight = false;
    this.mouseX0 = 0;
    this.mouseY0 = 0;
    this.mouseX1 = 0;
    this.mouseY1 = 0;

    // RGB colors matching TestGrid
    this.colors = {
      [Grid.BLOCKED]: "#404040",    // Gray
      [Grid.GROUND]: "#00cc00",     // Green
      [Grid.WATER]: "#0066cc",      // Blue
    };

    this.pathColor = "#ffff00";     // Yellow for path
    this.startColor = "#ffffff";    // White for start/end
    this.noPathColor = "#ff0000";   // Red for no path
    this.highlightColor = "#ffff00"; // Yellow for connected areas

    this.animationId = null;
    this.path = [];

    this.setupListeners();
    this.animate();
  }

  setupListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("wheel", (e) => this.onWheel(e));
  }

  mouseToGridX(x) {
    const rect = this.canvas.getBoundingClientRect();
    const relX = x - rect.left;
    const gridX = Math.floor((relX / rect.width) * this.grid.getWidth());
    return Math.max(0, Math.min(gridX, this.grid.getWidth() - this.objectSize - 1));
  }

  mouseToGridY(y) {
    const rect = this.canvas.getBoundingClientRect();
    const relY = y - rect.top;
    const gridY = Math.floor((relY / rect.height) * this.grid.getHeight());
    return Math.max(0, Math.min(gridY, this.grid.getHeight() - this.objectSize - 1));
  }

  onMouseDown(e) {
    if (e.button === 0) this.mouseLeft = true;
    else if (e.button === 2) this.mouseRight = true;
    else if (e.button === 1) this.objectSize = (this.objectSize + 1) % 3;

    const x = this.mouseToGridX(e.clientX);
    const y = this.mouseToGridY(e.clientY);
    this.mouseX0 = this.mouseX1 = x;
    this.mouseY0 = this.mouseY1 = y;
  }

  onMouseUp(e) {
    if (e.button === 0) this.mouseLeft = false;
    else if (e.button === 2) this.mouseRight = false;
  }

  onMouseMove(e) {
    this.mouseX1 = this.mouseToGridX(e.clientX);
    this.mouseY1 = this.mouseToGridY(e.clientY);
  }

  onWheel(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      this.objectSize = Math.min(2, this.objectSize + 1);
    } else {
      this.objectSize = Math.max(0, this.objectSize - 1);
    }
  }

  generateRandomMap() {
    for (let y = 0; y < this.grid.getHeight(); y++) {
      for (let x = 0; x < this.grid.getWidth(); x++) {
        const rand = Math.random();
        if (rand < 0.1) {
          this.grid.setTile(x, y, Grid.BLOCKED);
        } else if (rand < 0.55) {
          this.grid.setTile(x, y, Grid.WATER);
        } else {
          this.grid.setTile(x, y, Grid.GROUND);
        }
      }
    }
  }

  drawPixel(x, y, border, color) {
    const canvasW = this.canvas.width;
    const canvasH = this.canvas.height;
    const gridW = this.grid.getWidth();
    const gridH = this.grid.getHeight();

    const xPixel = 1.0 / canvasW;
    const yPixel = 1.0 / canvasH;
    const xScale = canvasW / gridW;
    const yScale = canvasH / gridH;

    const x0 = (x * xScale) + xPixel * border;
    const x1 = ((x + 1) * xScale) - xPixel * (border + 1);
    const y0 = (y * yScale) + yPixel * border;
    const y1 = ((y + 1) * yScale) - yPixel * (border + 1);

    this.ctx.fillStyle = color;
    this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }

  drawBlock(x, y, size, color) {
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        this.drawPixel(x + j, y + i, 0, color);
      }
    }
  }

  animate = () => {
    // Clear canvas
    this.ctx.fillStyle = "#1a1a1a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all tiles
    for (let y = 0; y < this.grid.getHeight(); y++) {
      for (let x = 0; x < this.grid.getWidth(); x++) {
        const tile = this.grid.getTile(x, y);
        const color = this.colors[tile];
        this.drawPixel(x, y, 0, color);
      }
    }

    // LEFT CLICK: Find shortest path
    if (this.mouseLeft) {
      const connected = this.grid.isConnected(
        this.objectSize,
        this.mouseX0,
        this.mouseY0,
        this.mouseX1,
        this.mouseY1,
      );

      if (connected) {
        const path = this.grid.findShortestPath(
          this.objectSize,
          this.mouseX0,
          this.mouseY0,
          this.mouseX1,
          this.mouseY1,
        );

        // Draw path in yellow
        let px = this.mouseX0;
        let py = this.mouseY0;

        for (const dirName of path) {
          const dir = Grid.Direction[dirName];
          px += dir.dx;
          py += dir.dy;
          this.drawBlock(px, py, this.objectSize, this.pathColor);
        }

        // Draw start and end (white for valid path)
        this.drawBlock(this.mouseX0, this.mouseY0, this.objectSize, this.startColor);
        this.drawBlock(this.mouseX1, this.mouseY1, this.objectSize, this.startColor);
      } else {
        // No path found - draw start and end in red
        this.drawBlock(this.mouseX0, this.mouseY0, this.objectSize, this.noPathColor);
        this.drawBlock(this.mouseX1, this.mouseY1, this.objectSize, this.noPathColor);
      }
    }
    // RIGHT CLICK: Show connected component
    else if (this.mouseRight) {
      for (let y = 0; y + this.objectSize < this.grid.getHeight(); y++) {
        for (let x = 0; x + this.objectSize < this.grid.getWidth(); x++) {
          if (
            this.grid.isConnected(
              this.objectSize,
              this.mouseX1,
              this.mouseY1,
              x,
              y,
            )
          ) {
            this.drawBlock(x, y, this.objectSize, this.highlightColor);
          }
        }
      }
      this.drawBlock(this.mouseX1, this.mouseY1, this.objectSize, this.startColor);
    }
    // NO MOUSE BUTTON: Show cursor position
    else {
      this.drawBlock(this.mouseX1, this.mouseY1, this.objectSize, this.startColor);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };
}
