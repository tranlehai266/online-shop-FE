import React from "react";
import TopCategory from "../components/category/TopCategory";
import Products from "../components/products/Products";
import { Stack } from "@mui/material";

function HomePage() {
  return (
    <Stack>
      <TopCategory />
      <Products />
    </Stack>
  );
}

export default HomePage;
