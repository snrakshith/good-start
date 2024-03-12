Critical Events

CI goal of the Build Artifact

- Start
- Build
- Test

CD
JS good defaults + do it as per ur will

> Onboard

[Node config hell](https://deno.com/blog/node-config-hell)

- To initalise gs in our existing project

  > npx run gs init --clean or --default

- To start gs core

  > npx run gs --start

- To see the new updated workflow of commands
  > npx run gs --update-package
- To clear the unwanted files
  > npx run gs --nuke

To automate the Update gitignore file via git hook

- for pre-build.sh

```bash
#!/bin/bash

# Path to the update_gitignore.sh script
SETUP_SCRIPT="./update_gitignore.sh"

# Run the setup script if it exists
if [ -f "$SETUP_SCRIPT" ]; then
    bash "$SETUP_SCRIPT"
fi
```
