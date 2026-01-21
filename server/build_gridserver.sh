#!/usr/bin/env bash
set -e

echo "Building gridserver..."

# Go to repo root (server/ is the workdir on Render)
cd ..

# Clean + build using the makefile inside cpp_folder
make -C cpp_folder clean || true
make -C cpp_folder

# Ensure output is named exactly "gridserver"
# If your makefile outputs something else, rename it here.
chmod +x cpp_folder/gridserver

echo "gridserver built at cpp_folder/gridserver"
echo "Build complete."
