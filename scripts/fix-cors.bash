#!/usr/bin/env bash

# just a little script so i remember what i had to do in case i ever need to do it again
# fixes the CORS policy on b2 bucket to allow presigned urls to do uploads from the browser

set -euo pipefail

BUCKET_NAME="apostoli"

POLICY="$(cat << EOF
[
  {
    "corsRuleName": "downloadFromAnyOrigin",
    "allowedOrigins": [
      "*"
    ],
    "allowedHeaders": [
      "authorization",
      "range"
    ],
    "allowedOperations": [
      "b2_download_file_by_id",
      "b2_download_file_by_name"
    ],
    "exposeHeaders": [
      "x-bz-content-sha1"
    ],
    "maxAgeSeconds": 3600
  },
  {
    "corsRuleName": "s3DownloadFromAnyOrigin",
    "allowedOrigins": [
      "*"
    ],
    "allowedHeaders": [
      "authorization",
      "range"
    ],
    "allowedOperations": [
      "s3_get",
      "s3_head"
    ],
    "exposeHeaders": [],
    "maxAgeSeconds": 3600
  },
  {
    "corsRuleName": "s3UploadFromAnyOrigin",
    "allowedOrigins": [
      "*"
    ],
    "allowedHeaders": [
      "authorization",
      "content-type"
    ],
    "allowedOperations": [
      "s3_put"
    ],
    "exposeHeaders": [],
    "maxAgeSeconds": 3600
  }
]
EOF
)"

echo "Updating CORS rules for bucket: $BUCKET_NAME..."
b2 bucket update --cors-rules="$POLICY" "$BUCKET_NAME" allPrivate
echo "Done."
