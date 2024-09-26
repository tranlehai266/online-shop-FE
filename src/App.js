import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
