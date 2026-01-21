/**
 * Grid pathfinding algorithm
 * A* search with BFS connectivity checking
 */

export class Grid {
  static BLOCKED = 0;
  static GROUND = 1;
  static WATER = 2;

  static Direction = {
    N: { dx: 0, dy: -1, cost: 1 },
    NE: { dx: 1, dy: -1, cost: 1.414 },
    E: { dx: 1, dy: 0, cost: 1 },
    SE: { dx: 1, dy: 1, cost: 1.414 },
    S: { dx: 0, dy: 1, cost: 1 },
    SW: { dx: -1, dy: 1, cost: 1.414 },
    W: { dx: -1, dy: 0, cost: 1 },
    NW: { dx: -1, dy: -1, cost: 1.414 },
  };

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width * height).fill(Grid.GROUND);
  }

  getTile(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height)
      return Grid.BLOCKED;
    return this.tiles[y * this.width + x];
  }

  setTile(x, y, tile) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.tiles[y * this.width + x] = tile;
    }
  }

  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }

  canOccupyRegion(x, y, size, tileType) {
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        if (this.getTile(x + j, y + i) !== tileType) {
          return false;
        }
      }
    }
    return true;
  }

  isConnected(size, x0, y0, x1, y1) {
    if (
      !this.isValidPosition(x0, y0, size) ||
      !this.isValidPosition(x1, y1, size)
    ) {
      return false;
    }

    const startTile = this.getTile(x0, y0);
    if (startTile === Grid.BLOCKED) return false;
    if (!this.canOccupyRegion(x0, y0, size, startTile)) return false;

    const visited = new Set();
    const queue = [[x0, y0]];
    visited.add(`${x0},${y0}`);

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (x === x1 && y === y1) return true;

      for (const dir of Object.values(Grid.Direction)) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        const key = `${nx},${ny}`;

        if (!visited.has(key) && this.canMove(size, x, y, nx, ny)) {
          visited.add(key);
          queue.push([nx, ny]);
        }
      }
    }
    return false;
  }

  canMove(size, x0, y0, x1, y1) {
    if (!this.isValidPosition(x1, y1, size)) return false;

    const tile = this.getTile(x0, y0);
    if (tile === Grid.BLOCKED) return false;

    const minX = Math.min(x0, x1);
    const maxX = Math.max(x0, x1);
    const minY = Math.min(y0, y1);
    const maxY = Math.max(y0, y1);

    for (let x = minX; x <= maxX + size; x++) {
      for (let y = minY; y <= maxY + size; y++) {
        if (this.getTile(x, y) !== tile) {
          return false;
        }
      }
    }
    return true;
  }

  isValidPosition(x, y, size) {
    return x >= 0 && y >= 0 && x + size < this.width && y + size < this.height;
  }

  findShortestPath(size, x0, y0, x1, y1) {
    if (!this.isConnected(size, x0, y0, x1, y1)) {
      return [];
    }

    const openSet = new Set([`${x0},${y0}`]);
    const cameFrom = new Map();
    const gScore = new Map([`${x0},${y0}`, 0]);
    const fScore = new Map([`${x0},${y0}`, this.heuristic(x0, y0, x1, y1)]);

    while (openSet.size > 0) {
      let current = null;
      let lowestF = Infinity;
      for (const key of openSet) {
        const f = fScore.get(key) || Infinity;
        if (f < lowestF) {
          lowestF = f;
          current = key;
        }
      }

      const [x, y] = current.split(",").map(Number);

      if (x === x1 && y === y1) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current);

      for (const dir of Object.values(Grid.Direction)) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;
        const neighbor = `${nx},${ny}`;

        if (!this.canMove(size, x, y, nx, ny)) continue;

        const tentativeG = (gScore.get(current) || 0) + dir.cost;
        const neighborG = gScore.get(neighbor) || Infinity;

        if (tentativeG < neighborG) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeG);
          fScore.set(neighbor, tentativeG + this.heuristic(nx, ny, x1, y1));

          if (!openSet.has(neighbor)) {
            openSet.add(neighbor);
          }
        }
      }
    }

    return [];
  }

  heuristic(x0, y0, x1, y1) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    return Math.min(dx, dy) * 1.414 + Math.abs(dx - dy);
  }

  reconstructPath(cameFrom, current) {
    const path = [];
    while (cameFrom.has(current)) {
      const [x, y] = current.split(",").map(Number);
      const prev = cameFrom.get(current);
      const [px, py] = prev.split(",").map(Number);

      const dx = x - px;
      const dy = y - py;

      for (const [dirName, dir] of Object.entries(Grid.Direction)) {
        if (dir.dx === dx && dir.dy === dy) {
          path.unshift(dirName);
          break;
        }
      }

      current = prev;
    }
    return path;
  }
}
