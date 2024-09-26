import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImage from "../images/ai-generated-modern-styled-entryway.jpg";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
