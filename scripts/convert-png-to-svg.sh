#!/usr/bin/env bash

# Run this on mac by installing these packages:
# brew install imagemagick
# brew insrall potrace
echo ls
for p in  *.png; do
      echo "converting $p => .svg"
      convert -alpha remove $p pgm: | mkbitmap -f 32 -t 0.4 - -o - | potrace --svg -o $p.svg
done
