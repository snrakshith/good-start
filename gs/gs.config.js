// import { gsInitializer, copyToRoot, nuke } from "gs";
// when we are copying to root, run update_gitignore.sh

// import { gsCore, nuke } from "gs";
// gsCore => gsInitializer + copyToRoot + update_gitignore.sh
// gsNuke => nuke.js

export default {
  runs_on: {
    default: ["start"], // "test", "build"
    scripts: {
      pre: "node -e \"require('gs').gsCore()\"",
      post: "node -e \"require('gs').nuke()\"",
    },
    extends: {
      cmd: ["xj"],
    },
    options: {
      es6: false,
      cache: false,
    },
  },
  gs: {
    configs: {
      eslint: "root",
      tailwind: {
        "tailwind.config.js": "root",
      },
    },
    defaults: {
      test: "src/test",
      docker: "root",
    },
  },
};
