## GS-Core Sequence

- Step 1
  - Confirm checks before good-start(gs) boots up
    - Check for the gs folder
    - Check if a gs.config.jsong file exists
- Step 2

  - Setup a pre script configured as a git hook with husky
  - Simple pre script configuration within scripts of package.json

- Step 3

  - Follow inverse .gitignore file strategy,
    - make sure that we are not keeping track of same config file,
      multiple times
    - all avoid duplication of these config files

- Step 4

  - Read the gs.config.json to know the write locations of the files

  - Mapping is folder to write paths

- Step 5

  - Clone gs folders content into .hell folder(only files) - .hell will act as a proxy, - contents .hell folder not be tracked by GIT/source controlled.

- Step 6

  - Copy all the required files from .hell to the root of the project

- Step 7
  - On stop of the server or on CTRL + C
  - remove these files from the root or cleanup
