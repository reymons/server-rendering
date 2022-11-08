const path = require("path");

require("@babel/register")({
  configFile: false,
  presets: ["@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx"],
        alias: {
          "@client": path.resolve(__dirname, "../client"),
          "@dist": path.resolve(__dirname, "../dist"),
          "@webpack": path.resolve(__dirname, "../webpack")
        }
      }
    ]
  ]
});

require("./server");
