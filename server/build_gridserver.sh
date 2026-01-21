#!/usr/bin/env bash
set -e

echo "Building gridserver..."
cd ..

echo "== Toolchain =="
which make || true
make --version || true
which g++ || true
g++ --version || true

echo "== Build =="
make -C cpp_folder clean || true
make -C cpp_folder

echo "== Verify output =="
if [ ! -f cpp_folder/gridserver ]; then
  echo "ERROR: cpp_folder/gridserver was not created."
  echo "Contents of cpp_folder:"
  ls -la cpp_folder
  exit 1
fi

chmod +x cpp_folder/gridserver

# Print what the binary actually is (Linux should say ELF)
echo "Binary type:"
file cpp_folder/gridserver || true

echo "== Smoke test =="
# Try to run it (won't crash the build if it errors, but will show output in logs)
set +e
(cd cpp_folder && ./gridserver grid | head -c 400)
echo
set -e

echo "Build complete."
