import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function AdminRoute({ children }) {
  const auth = useAuth();
  const { user, isInitialized } = auth;

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminRoute;
