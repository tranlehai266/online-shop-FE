import React from "react";
import { Stack } from "@mui/material";

import MainHeader from "./MainHeader";
import Slide from "./Slide";

function Header() {
  return (
    <Stack
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <MainHeader />
      <Slide />
    </Stack>
  );
}

export default Header;
