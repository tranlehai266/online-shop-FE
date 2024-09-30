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
import MainShop from "../layouts/MainShop";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/" element={<MainShop />}>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-category" element={<ProductCategoryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Route>

      <Route
        element={
          <MuiThemeProvider theme={loginTheme}>
            <BlankLayout />
          </MuiThemeProvider>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm-email" element={<VerifiedPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      
    </Routes>
  );
}

export default Router;
