#!/bin/sh

DIST=../../public/spa
rm -r $DIST
mkdir $DIST
cp -r ./build/. $DIST
