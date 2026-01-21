bool Grid::isConnected(int size, int x1, int y1, int x2, int y2) const {
	// Check bounds for the starting and target positions
	if (x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0 || x1 + size + 1 > getWidth() ||
	    y1 + size + 1 > getHeight() || x2 + size + 1 > getWidth() ||
	    y2 + size + 1 > getHeight()) {
		return false;
	}

	// Check if starting and target tiles are of the same type
	if (getTile(x1, y1) != getTile(x2, y2)) {
		return false;
	}

	// Perform flood fill with caching
	std::queue<std::pair<int, int>> toVisit;
	std::set<std::pair<int, int>> spotted;

	toVisit.push({x1, y1});
	spotted.insert({x1, y1}); // Store (x1, y1) directly as a pair in visited

	// Only consider the four cardinal directions: North, East, South, and West
	int dx[4] = {0, 1, 0, -1}; // N, E, S, W
	int dy[4] = {-1, 0, 1, 0};

	while (!toVisit.empty()) {
		auto [cx, cy] = toVisit.front();
		toVisit.pop();

		// Check if target is reached
		if (cx == x2 && cy == y2) {
			return true;
		}

		// Explore cardinal directions only
		for (int i = 0; i < 4; ++i) {
			int nx = cx + dx[i];
			int ny = cy + dy[i];

			// Check boundaries for object size
			if (nx < 0 || ny < 0 || nx + size >= getWidth() ||
			    ny + size >= getHeight()) {
				continue;
			}

			// Check if all tiles in the bounding box for the object match the
			// tile type
			bool valid = true;
			for (int i = 0; i <= size && valid; ++i) {
				for (int j = 0; j <= size && valid; ++j) {
					if (getTile(nx + i, ny + j) != getTile(x1, y1)) {
						valid = false;
					}
				}
			}

			if (valid) {
				if (spotted.find({nx, ny}) == spotted.end()) {
					toVisit.push({nx, ny});
					spotted.insert(
					    {nx, ny}); // Mark (nx, ny) as visited directly
				}
			}

			// Add valid, unvisited nodes to the queue
			// if (canMove && spotted.find({nx, ny}) == spotted.end()) {
			// 	toVisit.push({nx, ny});
			// 	spotted.insert({nx, ny}); // Mark (nx, ny) as visited directly
			// }
		}
	}

	return false;
}