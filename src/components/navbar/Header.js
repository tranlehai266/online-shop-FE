import React from "react";
import { Divider, Stack } from "@mui/material";

import MainHeader from "./MainHeader";
import Slide from "./Slide";

function Header() {
  return (
    <Stack
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Slide />
      <MainHeader />
      <Divider
        sx={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          zIndex: 2,
          borderColor: "white",
          opacity: "0.5",
        }}
      />
    </Stack>
  );
}

export default Header;
