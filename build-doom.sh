#!/bin/bash

if [ ! -f "src/packages/sdldoom-1.10/doom1.wad" ]; then
	if [ -z "$DOOM_WAD_URL" ]; then
		echo "DOOM_WAD_URL is not set. Please set it to the URL of the DOOM WAD file."
		exit 1
	fi
	curl "$DOOM_WAD_URL" -s -L -o src/packages/sdldoom-1.10/doom1.wad
	sha1sum src/packages/sdldoom-1.10/doom1.wad
fi

cd src/packages/sdldoom-1.10 || exit
export EMCC_CFLAGS="-std=gnu89 -sUSE_SDL"
emconfigure ./configure
emmake make
emcc -o doom.html ./*.o --preload-file doom1.wad \
    -s FORCE_FILESYSTEM=1 -lidbfs.js -s ALLOW_MEMORY_GROWTH=1 \
    --shell-file ../../doom-shell.html
mkdir -p ../../../public/doom
mv doom.* ../../../public/doom
