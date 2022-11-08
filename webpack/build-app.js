const webpack = require("webpack");
const { green, cyan } = require("chalk");

function logStats(stats) {
  const assets = stats.toJson().assets;
  let names = [];
  for (const { name, size } of assets) {
    const convertedSize = (size / 1024).toFixed(2);
    names.push(`${name}: ${green(convertedSize)} kb`);
  }
  console.log(`\n${cyan("Assets")}:\n${names.join("\n")}\n`);
}

function buildApp(config) {
  return new Promise(resolve => {
    const compiler = webpack(config, (err, stats) => {
      if (err) throw err;
      if (stats.hasErrors()) throw stats.toJson().errors;
      logStats(stats);
      resolve(compiler);
    });
  });
}

module.exports = buildApp;
