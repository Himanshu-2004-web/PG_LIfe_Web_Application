import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

// 🔥 VERY IMPORTANT
window.bootstrap = bootstrap;

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);
