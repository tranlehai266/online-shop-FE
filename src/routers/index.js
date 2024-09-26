import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import DetailPage from "../pages/DetailPage";
import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import VerifiedPage from "../pages/VerifiedPage";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import loginTheme from "../theme/logintheme";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product-category" element={<ProductCategoryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="/profile"
        element={
          <AuthRequire>
            <AccountPage />
          </AuthRequire>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthRequire>
            <CartPage />
          </AuthRequire>
        }
      />

      <Route element={<BlankLayout />}>
        <Route
          path="/login"
          element={
            <MuiThemeProvider theme={loginTheme}>
              <LoginPage />
            </MuiThemeProvider>
          }
        />
        <Route
          path="/register"
          element={
            <MuiThemeProvider theme={loginTheme}>
              <RegisterPage />
            </MuiThemeProvider>
          }
        />
        <Route
          path="/confirm-email"
          element={
            <MuiThemeProvider theme={loginTheme}>
              <VerifiedPage />
            </MuiThemeProvider>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
