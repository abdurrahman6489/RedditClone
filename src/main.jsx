import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createStore } from "redux";
import { Provider as ReactReduxProvider } from "react-redux";
import { postReducer } from "./reducer.js";
import { ChakraProvider } from "@chakra-ui/react";

const store = createStore(postReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ReactReduxProvider store={store}>
        <App />
      </ReactReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
);
