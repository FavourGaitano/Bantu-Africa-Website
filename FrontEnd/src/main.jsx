import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";
import { ToasterContainer } from "./components/shared/Toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToasterContainer />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
