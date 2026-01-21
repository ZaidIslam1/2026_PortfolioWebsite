#!/usr/bin/env bash
set -e

echo "Building gridserver (headless)..."
cd ..

# Compile ONLY the server (no OpenGL)
g++ -O3 -std=c++17 \
  cpp_folder/GridServer.cpp cpp_folder/Grid.cpp \
  -o cpp_folder/gridserver

chmod +x cpp_folder/gridserver

echo "Binary type:"
file cpp_folder/gridserver || true

echo "Smoke test:"
(cd cpp_folder && ./gridserver grid | head -c 200)
echo
echo "Build complete."
