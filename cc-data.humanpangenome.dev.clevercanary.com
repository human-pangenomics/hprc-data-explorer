#!/usr/bin/env bash
# Set the script to exit immediately on error
set -e

echo \"Deleting ./out/\"
rm -rf ./out/

n 20.10.0
npm ci

# Build
npm run build:local

export BUCKET=s3://t58-data.humanpangenome.dev/
export SRCDIR=out/

aws s3 sync  $SRCDIR $BUCKET --delete --profile excira
aws cloudfront create-invalidation --distribution-id E10OLP97EFY3BE --paths "/*" --profile excira