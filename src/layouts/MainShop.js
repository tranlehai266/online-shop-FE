import { Box, Stack, Toolbar } from "@mui/material";
import React from "react";

import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/navbar/MainHeader";

function MainShop() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Toolbar />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainShop;
