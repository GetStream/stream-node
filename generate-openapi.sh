#!/bin/bash
set -euo pipefail

FROM_REPO=$1;
DEFAULT_PRODUCT="all";
PRODUCT="${2:-$DEFAULT_PRODUCT}";

echo $PRODUCT;

if [ "$PRODUCT" != 'chat' ] && [ "$PRODUCT" != 'video' ] && [ "$PRODUCT" != 'all' ]; then
  echo "Invalid product option $PRODUCT"
  exit 1
fi

TEMP_OUTPUT_DIR="./openapi-temp"

if [ "$PRODUCT" == 'video' ] || [ "$PRODUCT" == 'all' ] ; then
  if  [ "$FROM_REPO" == 'chat' ]; then
    PROTOCOL_REPO_DIR="../chat"
  else
    PROTOCOL_REPO_DIR="../protocol"
  fi
  if  [ "$FROM_REPO" == 'chat' ]; then
    SCHEMA_FILE="$PROTOCOL_REPO_DIR/releases/video-openapi.yaml"
  else
    SCHEMA_FILE="$PROTOCOL_REPO_DIR/openapi/video-openapi.yaml"
  fi

  if  [ "$FROM_REPO" == 'chat' ]; then
    # Generate the Coordinator OpenAPI schema
    make -C $PROTOCOL_REPO_DIR openapi
  fi

  OUTPUT_DIR="./src/gen/video"

  # Clean previous output
  rm -rf $TEMP_OUTPUT_DIR
  rm -rf $OUTPUT_DIR

  mkdir $OUTPUT_DIR

  # NOTE: https://openapi-generator.tech/docs/generators/typescript-fetch/
  # Generate the Coordinator API models
  yarn openapi-generator-cli generate \
    -i "$SCHEMA_FILE" \
    -g typescript-fetch \
    -o "$TEMP_OUTPUT_DIR" \
    --additional-properties=supportsES6=true \
    --additional-properties=modelPropertyNaming=original \
    --additional-properties=enumPropertyNaming=UPPERCASE \
    --additional-properties=withoutRuntimeChecks=true \
    --model-name-prefix=Video

  # Remove the generated API client, just keep the models
  cp -r $TEMP_OUTPUT_DIR/ $OUTPUT_DIR
  rm -rf $TEMP_OUTPUT_DIR
fi


if [ "$PRODUCT" == 'chat' ] || [ "$PRODUCT" == 'all' ]; then
  if  [ "$FROM_REPO" == 'chat' ]; then
    PROTOCOL_REPO_DIR="../chat"
  else
    PROTOCOL_REPO_DIR="../protocol"
  fi
  if  [ "$FROM_REPO" == 'chat' ]; then
    SCHEMA_FILE="$PROTOCOL_REPO_DIR/releases/chat-openapi.yaml"
  else
    SCHEMA_FILE="$PROTOCOL_REPO_DIR/openapi/chat-openapi.yaml"
  fi

  if  [ "$FROM_REPO" == 'chat' ]; then
    # Generate the Coordinator OpenAPI schema
    make -C $PROTOCOL_REPO_DIR openapi
  fi

  OUTPUT_DIR="./src/gen/chat"

  # Clean previous output
  rm -rf $TEMP_OUTPUT_DIR
  rm -rf $OUTPUT_DIR

  mkdir $OUTPUT_DIR

  # NOTE: https://openapi-generator.tech/docs/generators/typescript-fetch/
  # Generate the Coordinator API models
  yarn openapi-generator-cli generate \
    -i "$SCHEMA_FILE" \
    -g typescript-fetch \
    -o "$TEMP_OUTPUT_DIR" \
    --additional-properties=supportsES6=true \
    --additional-properties=modelPropertyNaming=original \
    --additional-properties=enumPropertyNaming=UPPERCASE \
    --additional-properties=withoutRuntimeChecks=true \
    --global-property=skipFormModel=false \
    --skip-validate-spec

  # Remove the generated API client, just keep the models
  cp -r $TEMP_OUTPUT_DIR/ $OUTPUT_DIR
  rm -rf $TEMP_OUTPUT_DIR
fi
