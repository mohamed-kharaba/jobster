import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer position="top-center" />
        </Provider>
    </React.StrictMode>
);
