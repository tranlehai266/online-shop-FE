import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./app/store";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID_GOOGLE}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
