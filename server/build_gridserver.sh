#!/usr/bin/env bash
set -e

echo "Building gridserver..."
cd ..

# show tools (helps in Render logs)
which g++ || true
g++ --version || true
which make || true
make --version || true

# build
make -C cpp_folder

# IMPORTANT: ensure the output is named gridserver
if [ ! -f cpp_folder/gridserver ]; then
  echo "ERROR: cpp_folder/gridserver was not created by make"
  echo "Files in cpp_folder:"
  ls -la cpp_folder
  exit 1
fi

chmod +x cpp_folder/gridserver
echo "gridserver built OK"
