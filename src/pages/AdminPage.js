import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PasswordIcon from "@mui/icons-material/Password";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import StoreIcon from "@mui/icons-material/Store";
import { capitalCase } from "change-case";
import UsersSetting from "../components/admin/UsersSetting";
import ProductsSetting from "../components/admin/ProductsSetting";
import CategoriesSetting from "../components/admin/CategoriesSetting";
import ShoppingCartSetting from "../components/admin/ShoppingCartSetting";

function AdminPage() {
  const [currentTab, setCurrentTab] = useState("Users");

  const ACCOUNT_TABS = [
    {
      value: "Users",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <UsersSetting />,
    },
    {
      value: "Products",
      icon: <StoreIcon sx={{ fontSize: 30 }} />,
      component: <ProductsSetting />,
    },
    {
      value: "Categories",
      icon: <SellIcon sx={{ fontSize: 30 }} />,
      component: <CategoriesSetting />,
    },
    {
      value: "Shopping Cart",
      icon: <ShoppingCartIcon sx={{ fontSize: 30 }} />,
      component: <ShoppingCartSetting />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }} />

      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AdminPage;