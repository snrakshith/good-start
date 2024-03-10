#!/bin/bash

# Define the root directory of the Git repository
ROOT_DIR=$(git rev-parse --show-toplevel)

# List of filenames to track within the '.hell' folder
TRACKED_FILES=($(find "$ROOT_DIR/.hell" -type f -printf "%f\n"))

# Function to add filenames to a .gitignore file
add_to_gitignore() {
    local filename="$1"
    local gitignore="$2"

    # Check if the filename exists in the gitignore file
    if ! grep -q "^$filename$" "$gitignore"; then
        # Add the filename to the gitignore file
        echo "$filename" >> "$gitignore"
    fi
}

# Update the root .gitignore file
ROOT_GITIGNORE="$ROOT_DIR/.gitignore"
for file in "${TRACKED_FILES[@]}"; do
    add_to_gitignore "$file" "$ROOT_GITIGNORE"
done

# Update the .gitignore file within the '.gs' folder
GS_GITIGNORE="$ROOT_DIR/gs/.gitignore"

# Ensure the 'gs' folder exists
if [ ! -d "$ROOT_DIR/gs" ]; then
    echo "Error: 'gs' folder not found."
    exit 1
fi

for file in "${TRACKED_FILES[@]}"; do
    add_to_gitignore "!$file" "$GS_GITIGNORE"
done
