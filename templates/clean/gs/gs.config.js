export default {
  runs_on: {
    default: ["start"], // "test", "build"
    scripts: {
      pre: "node -e \"require('gs').gsCore()\"",
      post: "node -e \"require('gs').nukeCore()\"",
    },
    extends: {
      cmd: [""], // custom commands
    },
  },
};
