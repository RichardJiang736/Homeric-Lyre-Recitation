#!/usr/bin/env bash
# Download the MusicGen Lyre dataset from Hugging Face.
# Usage: bash data/download_data.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
RAW_DIR="$SCRIPT_DIR/raw"
ZIP_FILE="$SCRIPT_DIR/raw.zip"
HF_URL="https://huggingface.co/datasets/richardjiang736/musicgen-lyre-dataset/resolve/main/raw.zip"

if [ -d "$RAW_DIR/audio" ] && [ -d "$RAW_DIR/prompts" ]; then
    echo "Dataset already exists at $RAW_DIR"
    exit 0
fi

echo "Downloading dataset from Hugging Face..."
curl -L --progress-bar -o "$ZIP_FILE" "$HF_URL"
echo "Extracting..."
unzip -q "$ZIP_FILE" -d "$SCRIPT_DIR"
rm "$ZIP_FILE"
echo "Done. Dataset extracted to $RAW_DIR"
