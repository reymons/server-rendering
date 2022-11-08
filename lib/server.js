const http = require("http");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOM = require("react-dom/server");
const App = require("@client/App").default;
const webpackConfig = require("@webpack/config");
const webpackBuildApp = require("@webpack/build-app");
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);

async function createServer() {
  const dist = path.resolve(__dirname, "../dist");
  const isDev = process.env.NODE_ENV === "development";
  const compiler = await webpackBuildApp(webpackConfig);

  if (isDev) compiler.watch({}, () => {});

  const server = http.createServer(async (req, res) => {
    if (req.url === "/") {
      const html = await readFile(path.join(dist, "index.html"), "utf8");
      const renderedJSX = ReactDOM.renderToString(<App />);
      const result = html.replace(
        '<div id="root"></div>',
        `<div id="root">${renderedJSX}</div>`
      );
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(result);
      return;
    }

    if (req.url.endsWith(".js")) {
      const file = await readFile(path.join(dist, req.url));
      res.setHeader("Content-Type", "application/js");
      res.end(file);
      return;
    }

    res.statusCode = 404;
    res.end();
  });

  return server;
}

createServer().then(server => {
  server.on("error", err => {
    console.log(`ServerError: ${err.message}`);
  });

  server.on("clientError", err => {
    console.log(`ClientError: ${err.message}`);
  });

  server.listen(7000, () => {
    console.log(`The server is on port 7000, pid ${process.pid}`);
  });
});
