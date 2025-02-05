import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { register } from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

register(); // Register service worker
