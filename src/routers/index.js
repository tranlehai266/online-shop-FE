import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import VerifiedPage from "../pages/VerifiedPage";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import loginTheme from "../theme/logintheme";
import MainShop from "../layouts/MainShop";
import Shop from "../pages/ShopPage";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import OrderPage from "../pages/OrderPage";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "./AdminRoute";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/" element={<MainShop />}>
        <Route path="account" element={<AccountPage />} />
        <Route path="my-order" element={<OrderPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="shop" element={<Shop />} />
        <Route
          path="product-category/:categoryId"
          element={<ProductCategoryPage />}
        />
        <Route path="detail/:id" element={<DetailPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        ></Route>
      </Route>

      <Route
        element={
          <MuiThemeProvider theme={loginTheme}>
            <BlankLayout />
          </MuiThemeProvider>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="confirm-email" element={<VerifiedPage />} />
        <Route path="resetpassword" element={<ResetPasswordPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
