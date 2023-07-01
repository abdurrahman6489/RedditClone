import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createStore } from "redux";
import { Provider as ReactReduxProvider } from "react-redux";
import { postReducer } from "./reducer.js";

const store = createStore(postReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactReduxProvider store={store}>
      <App />
    </ReactReduxProvider>
  </React.StrictMode>
);
