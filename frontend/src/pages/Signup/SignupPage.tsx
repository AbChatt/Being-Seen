import React, { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SignupIcon from "@mui/icons-material/AccountCircle";

import Layout from "components/Layout";
import DonorSignup from "components/Signup/Donor";
import YouthSignup from "components/Signup/Youth";
import MerchantSignup from "components/Signup/Merchant";

import styles from "./SignupPage.module.scss";

const SignupPage = () => {
  const [tab, setTab] = useState(0);

  const changeTab = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Layout title="Signup">
      <Container maxWidth="xs">
        <div className={styles.signupContainer}>
          <Avatar sx={{ mb: 2, bgcolor: "primary.main" }}>
            <SignupIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mb={2}>
            Signup as...
          </Typography>
          <Box sx={{ width: 1, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={changeTab}
              className={styles.tabOverrides}
              variant="fullWidth"
            >
              <Tab label="Youth" />
              <Tab label="Donor" />
              <Tab label="Merchant" />
            </Tabs>
          </Box>
          {tab === 0 && <DonorSignup />}
          {tab === 1 && <MerchantSignup />}
          {tab === 2 && <YouthSignup />}
        </div>
      </Container>
    </Layout>
  );
};

export default SignupPage;
