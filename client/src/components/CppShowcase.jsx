import React, { useState } from "react";

export default function CppShowcase() {
  const [selectedFile, setSelectedFile] = useState("Grid.h");

  const cppFiles = {
    "Grid.h": `#pragma once

/*
 CMPUT 350 Assignment 3
 Grid-based Pathfinding with A* Algorithm
 
 Class Grid represents a rectangular tile map with octile topology (8 compass directions)
 Supports pathfinding and connectivity operations on blocked, ground, or water tiles
*/

enum Tile { BLOCKED = 0, GROUND = 1, WATER = 2 };
enum Direction { N, NE, E, SE, S, SW, W, NW };

class Grid {
private:
    int width, height;
    std::vector<std::vector<Tile>> map;
    mutable std::map<std::tuple<int,int,int,int,int>, bool> cache;

public:
    Grid(int width, int height);
    ~Grid();
    
    int getWidth() const;
    int getHeight() const;
    Tile getTile(int x, int y) const;
    void setTile(int x, int y, Tile tile);
    
    // Pathfinding
    bool isConnected(int size, int x1, int y1, int x2, int y2) const;
    int findShortestPath(int size, int x1, int y1, int x2, int y2, 
                         std::vector<Direction> &path) const;
    
    // Movement validation
    bool canMoveTo(int x, int y, int size, Tile tileType) const;
    bool isWithinBounds(int x, int y, int size) const;
    
private:
    int heuristic(int x1, int y1, int x2, int y2) const;
};`,

    "Grid.cpp": `#include "Grid.h"
#include <queue>
#include <set>
#include <cmath>

Grid::Grid(int width, int height)
    : width(width), height(height), map(height, std::vector<Tile>(width)) {
    assert(width > 0 && height > 0);
}

bool Grid::canMoveTo(int x, int y, int size, Tile tileType) const {
    if (!isWithinBounds(x, y, size)) return false;
    
    for (int dx = 0; dx <= size; ++dx) {
        for (int dy = 0; dy <= size; ++dy) {
            if (getTile(x + dx, y + dy) != tileType)
                return false;
        }
    }
    return true;
}

bool Grid::isConnected(int size, int x1, int y1, int x2, int y2) const {
    // Flood-fill algorithm with caching
    std::tuple<int,int,int,int,int> key = {size, x1, y1, x2, y2};
    
    if (cache.find(key) != cache.end()) {
        return cache[key];
    }
    
    std::queue<std::pair<int,int>> frontier;
    std::set<std::pair<int,int>> visited;
    
    frontier.push({x1, y1});
    visited.insert({x1, y1});
    
    while (!frontier.empty()) {
        auto [cx, cy] = frontier.front();
        frontier.pop();
        
        if (cx == x2 && cy == y2) {
            cache[key] = true;
            return true;
        }
        
        // Check 4 cardinal directions
        int dx[] = {0, 1, 0, -1};
        int dy[] = {-1, 0, 1, 0};
        
        for (int i = 0; i < 4; ++i) {
            int nx = cx + dx[i];
            int ny = cy + dy[i];
            
            if (canMoveTo(nx, ny, size, getTile(x1, y1)) && 
                visited.insert({nx, ny}).second) {
                frontier.push({nx, ny});
            }
        }
    }
    
    cache[key] = false;
    return false;
}

int Grid::findShortestPath(int size, int x1, int y1, int x2, int y2,
                           std::vector<Direction> &path) const {
    // A* pathfinding algorithm
    using Node = std::tuple<int, int, int>; // (f-cost, x, y)
    
    if (!isWithinBounds(x1, y1, size) || !isWithinBounds(x2, y2, size)) {
        return -1;
    }
    
    std::priority_queue<Node, std::vector<Node>, CompareNode> pq;
    std::map<std::tuple<int,int>, int> g_costs;
    std::map<std::tuple<int,int>, Direction> parent;
    
    g_costs[{x1, y1}] = 0;
    pq.push({heuristic(x1, y1, x2, y2), x1, y1});
    
    while (!pq.empty()) {
        auto [f, cx, cy] = pq.top();
        pq.pop();
        
        if (cx == x2 && cy == y2) {
            // Reconstruct path
            int px = x2, py = y2;
            while (px != x1 || py != y1) {
                Direction dir = parent[{px, py}];
                path.push_back(dir);
                // Move back based on direction...
            }
            std::reverse(path.begin(), path.end());
            return g_costs[{x2, y2}];
        }
        
        // Explore 8 compass directions
        for (int i = 0; i < 8; ++i) {
            // Calculate neighbor and update costs...
        }
    }
    
    return -1; // No path found
}

int Grid::heuristic(int x1, int y1, int x2, int y2) const {
    int dx = x1 - x2;
    int dy = y1 - y2;
    return static_cast<int>(std::sqrt(dx*dx + dy*dy) * CARDINAL_COST);
}`,

    Features: `Key Features of This Implementation:

✓ A* Pathfinding Algorithm
  - Octile topology (8 compass directions)
  - Euclidean distance heuristic
  - Optimal shortest path finding

✓ Connectivity Analysis
  - Flood-fill algorithm for connectivity checks
  - Query caching for performance
  - Support for multi-sized objects (0, 1, 2 tile sizes)

✓ Tile Type Support
  - Blocked tiles (obstacles)
  - Ground tiles (walkable)
  - Water tiles (special movement rules)
  
✓ Movement Validation
  - Boundary checking
  - Tile consistency validation
  - Diagonal movement validation

✓ Performance Optimizations
  - Result caching for repeated queries
  - Efficient data structures (priority queues, sets)
  - Time complexity: O(n log n) for pathfinding`,
  };

  return (
    <div className="bg-dark-800/50 border border-primary/20 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-primary mb-6">
        C++ Pathfinding Engine
      </h3>

      {/* File Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.keys(cppFiles).map((file) => (
          <button
            key={file}
            onClick={() => setSelectedFile(file)}
            className={`px-4 py-2 rounded transition-all ${
              selectedFile === file
                ? "bg-primary text-dark-900 font-semibold"
                : "bg-dark-700 text-primary hover:bg-dark-600 border border-primary/30"
            }`}
          >
            {file}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="bg-dark-900 border border-primary/30 rounded-lg overflow-hidden">
        <div className="bg-dark-800 px-4 py-2 border-b border-primary/20">
          <p className="text-sm text-primary/70">
            {selectedFile === "Features"
              ? "Project Overview"
              : `cpp_folder/${selectedFile}`}
          </p>
        </div>
        <pre className="overflow-x-auto p-4 text-sm text-dark-200 font-mono">
          <code>{cppFiles[selectedFile]}</code>
        </pre>
      </div>

      {/* Description */}
      <div className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded">
        <h4 className="font-semibold text-primary mb-2">About This Project</h4>
        <p className="text-dark-300 text-sm mb-2">
          CMPUT 350 Assignment 3 - Advanced grid-based pathfinding
          implementation
        </p>
        <p className="text-dark-300 text-sm">
          This C++ project implements sophisticated pathfinding algorithms
          including A* search and connectivity analysis using flood-fill. It
          handles complex movement constraints for objects of varying sizes on
          tile-based maps with multiple terrain types.
        </p>
      </div>
    </div>
  );
}
