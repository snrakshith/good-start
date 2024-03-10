#!/bin/bash

# Path to the update_gitignore.sh script
SETUP_SCRIPT="./update_gitignore.sh"

# Run the setup script if it exists
if [ -f "$SETUP_SCRIPT" ]; then
    bash "$SETUP_SCRIPT"
fi