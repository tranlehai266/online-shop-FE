import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import MainHeaderConTact from "../components/MainHeaderConTact";


function MainContact() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeaderConTact />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainContact;
