const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/todoapp.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
};
