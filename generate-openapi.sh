#!/bin/bash
set -euo pipefail

OUTPUT_DIR="../stream-node/src/gen"
CHAT_DIR="../chat"

rm -rf $OUTPUT_DIR

( cd $CHAT_DIR ; make openapi ; make -C tools/openapi build ; ./build/openapi generate-client --language ts --spec ./releases/v2/serverside-api.yaml --output $OUTPUT_DIR )

yarn lint:gen
