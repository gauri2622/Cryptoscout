import React, { useState } from "react";
import { Container, Paper, Typography, Tabs, Tab } from "@mui/material";
import Login from "./login";
import Register from "./Register";

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff0a", // Add background color here
        }}
      >
        <Tabs
  value={tabValue}
  onChange={handleTabChange}
  centered
  indicatorColor="white"
  style={{ marginTop: 16 }}
></Tabs>
        <Typography variant="h5" style={{ color: "white" }}>
          Crypto Scout
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          indicatorColor="white" // Set the indicator color to white
          style={{ marginTop: 16 }}
        >
          <Tab label="Login" style={{ color: "white" }} />
  <Tab label="Register" style={{ color: "white" }} />
        </Tabs>
        {tabValue === 0 && <Login />}
        {tabValue === 1 && <Register />}
      </Paper>
    </Container>
  );
};

export default AuthPage;
