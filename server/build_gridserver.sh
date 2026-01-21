#!/usr/bin/env bash
set -e

echo "Building gridserver..."

# Go to repo root (server/ is the workdir on Render)
cd ..

# Example: if you have a Makefile in cpp_folder
# make -C cpp_folder

# If you compile with g++ directly, use something like:
# g++ -O2 -std=c++17 -o cpp_folder/gridserver cpp_folder/*.cpp

chmod +x cpp_folder/gridserver
echo "gridserver built at cpp_folder/gridserver"
echo "Build complete."