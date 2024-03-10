#!/bin/bash

# Define the root directory of the Git repository
ROOT_DIR=$(git rev-parse --show-toplevel)

# List of filenames to track within the 'gs' folder
TRACKED_FILES=($(find "$ROOT_DIR/.hell" -type f -printf "%f\n"))

# Create or update the root .gitignore file
ROOT_GITIGNORE="$ROOT_DIR/.gitignore"
for file in "${TRACKED_FILES[@]}"; do
    echo "$file" >> "$ROOT_GITIGNORE"
done

# Create or update the .gitignore file within the 'gs' folder
GS_GITIGNORE="$ROOT_DIR/gs/.gitignore"
for file in "${TRACKED_FILES[@]}"; do
    echo "!$file" >> "$GS_GITIGNORE"
done
