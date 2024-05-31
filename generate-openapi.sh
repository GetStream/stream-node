#!/bin/bash
set -euo pipefail

FROM_REPO=$1;

TEMP_OUTPUT_DIR="./openapi-temp"

if  [ "$FROM_REPO" == 'chat' ]; then
    PROTOCOL_REPO_DIR="../chat"
else
  PROTOCOL_REPO_DIR="../protocol"
fi
if  [ "$FROM_REPO" == 'chat' ]; then
  make -C $PROTOCOL_REPO_DIR openapi
  SCHEMA_FILE="$PROTOCOL_REPO_DIR/releases/v2/serverside-api.yaml"
else
  SCHEMA_FILE="$PROTOCOL_REPO_DIR/openapi/serverside-api.yaml"
fi

OUTPUT_DIR="./src/gen/"

# NOTE: https://openapi-generator.tech/docs/generators/typescript-fetch/
yarn openapi-generator-cli generate \
  -i "$SCHEMA_FILE" \
  -g typescript-fetch \
  -o "$TEMP_OUTPUT_DIR" \
  --additional-properties=supportsES6=true \
  --additional-properties=modelPropertyNaming=original \
  --additional-properties=enumPropertyNaming=UPPERCASE \
  --additional-properties=withoutRuntimeChecks=true \
  --global-property=skipFormModel=false

# Remove the generated API client, just keep the models
cp -r $TEMP_OUTPUT_DIR/ $OUTPUT_DIR
rm -rf $TEMP_OUTPUT_DIR

