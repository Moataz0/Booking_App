import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/SearchContext";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import "react-image-gallery/styles/css/image-gallery.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
