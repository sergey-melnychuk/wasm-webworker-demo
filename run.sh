#!/bin/sh
rm -rf target pkg

wasm-pack build --target web

node serve.mjs
