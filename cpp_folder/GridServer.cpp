#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include "Grid.h"

using namespace std;

// Load BMP map
Grid* loadMapFromBMP(const char* filename) {
    ifstream file(filename, ios::binary);
    if (!file) {
        cerr << "Failed to open file: " << filename << endl;
        return nullptr;
    }

    // Read BMP header
    file.seekg(18);
    int width, height;
    file.read(reinterpret_cast<char*>(&width), 4);
    file.read(reinterpret_cast<char*>(&height), 4);

    Grid* grid = new Grid(width, height);

    // Read pixel data
    file.seekg(54);
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            unsigned char b, g, r;
            file.read(reinterpret_cast<char*>(&b), 1);
            file.read(reinterpret_cast<char*>(&g), 1);
            file.read(reinterpret_cast<char*>(&r), 1);

            Grid::Tile tile = Grid::BLOCKED;
            if (g > 96) tile = Grid::GROUND;
            if (b > 96) tile = Grid::WATER;

            grid->setTile(x, y, tile);
        }
    }

    file.close();
    return grid;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cerr << "Usage: " << argv[0] << " <command> [args...]" << endl;
        return 1;
    }

    string command = argv[1];
    Grid* grid = loadMapFromBMP("map.bmp");
    
    if (!grid) {
        cerr << "ERROR" << endl;
        return 1;
    }

    if (command == "grid") {
        // Output grid info as JSON
        cout << "{\"width\":" << grid->getWidth() << ",\"height\":" << grid->getHeight() << ",\"tiles\":[";
        for (int y = 0; y < grid->getHeight(); y++) {
            for (int x = 0; x < grid->getWidth(); x++) {
                if (y > 0 || x > 0) cout << ",";
                cout << (int)grid->getTile(x, y);
            }
        }
        cout << "]}" << endl;
    }
    else if (command == "findpath" && argc >= 7) {
        int size = stoi(argv[2]);
        int x0 = stoi(argv[3]);
        int y0 = stoi(argv[4]);
        int x1 = stoi(argv[5]);
        int y1 = stoi(argv[6]);

        vector<Grid::Direction> path;
        int cost = grid->findShortestPath(size, x0, y0, x1, y1, path);

        if (cost >= 0) {
            cout << "{\"connected\":true,\"path\":[\"" << x0 << "," << y0 << "\"";
            
            int cx = x0, cy = y0;
            const int dx[] = {0, 1, 1, 1, 0, -1, -1, -1};
            const int dy[] = {-1, -1, 0, 1, 1, 1, 0, -1};
            
            for (Grid::Direction dir : path) {
                cx += dx[dir];
                cy += dy[dir];
                cout << ",\"" << cx << "," << cy << "\"";
            }
            cout << "]}" << endl;
        } else {
            cout << "{\"connected\":false,\"path\":[]}" << endl;
        }
    }
    else if (command == "connected" && argc >= 7) {
        int size = stoi(argv[2]);
        int x0 = stoi(argv[3]);
        int y0 = stoi(argv[4]);
        int x1 = stoi(argv[5]);
        int y1 = stoi(argv[6]);

        bool connected = grid->isConnected(size, x0, y0, x1, y1);
        cout << (connected ? "1" : "0") << endl;
    }

    delete grid;
    return 0;
}
