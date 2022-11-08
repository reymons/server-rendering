import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const content = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById("root");

ReactDOM.hydrateRoot(rootElement, content);
