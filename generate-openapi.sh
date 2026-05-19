#!/bin/bash
set -euo pipefail

OUTPUT_DIR="../stream-node/src/gen"
CHAT_DIR="../chat"

rm -rf $OUTPUT_DIR

# `make openapi` builds the chat-manager binary into ./build/ and regenerates
# the spec files under ./releases/v2/. Reuse the built binary instead of
# `go run`, which broke when chat-manager moved to projects/chat-manager/
# (its own module under the monorepo restructure).
( cd $CHAT_DIR ; make openapi ; ./build/chat-manager openapi generate-client --language ts --spec ./releases/v2/serverside-api.yaml --output $OUTPUT_DIR )

yarn lint:gen