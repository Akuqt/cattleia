import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { MetaMaskProvider } from "metamask-react";

ReactDOM.render(
  <Provider store={store}>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </Provider>,
  document.getElementById("root")
);
