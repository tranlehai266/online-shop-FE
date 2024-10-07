import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PasswordIcon from '@mui/icons-material/Password';
import AccountSettings from "../components/account/AccountSettings";
import AccountPassword from "../components/account/AccountPassword";
import { capitalCase } from "change-case";

function AccountPage() {
  const [currentTab, setCurrentTab] = useState("Account Settings");

  const ACCOUNT_TABS = [
    {
      value: "Account Settings",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <AccountSettings />,
    },
    {
      value: "Change Password",
      icon: <PasswordIcon sx={{ fontSize: 30 }} />,
      component: <AccountPassword />,
    },
  ];

  return (
    <Container>
      <Typography variant="h5" fontWeight="500" gutterBottom>
        Account Settings
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

export default AccountPage;
