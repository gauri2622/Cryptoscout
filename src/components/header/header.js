import React, { useContext } from "react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Crypto } from "../../CryptoContext";
import AuthPage from "../auth/AuthPage";

const Header = () => {
  const { currency, setCurrency } = useContext(Crypto);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "#fff",
      fontFamily: "Inter !important",
      fontWeight: "700 !important",
      cursor: "pointer",
    },
    loginButton: {
      color: "#fff",
      cursor: "pointer",
      marginLeft: "auto",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  }));

  const styles = useStyles();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleLoginClick = () => {
    // Use navigate function with the absolute path
    navigate("/auth");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar sx={{ pt: 2, pb: 2 }}>
              <Typography
                onClick={() => navigate("/")}
                variant="h5"
                component="div"
                className={styles.title}
              >
                Crypto<span style={{ color: "#7668e9" }}>Scout</span>
              </Typography>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                variant="outlined"
                inputProps={{ "aria-label": "without-label" }}
                style={{
                  width: 100,
                  padding: 0,
                  marginRight: "16px",
                }}
              >
                <MenuItem value={"usd"}>USD</MenuItem>
                <MenuItem value={"idr"}>IDR</MenuItem>
                <MenuItem value={"inr"}>INR</MenuItem>
              </Select>
              {/* Replace the Typography block with Link */}
              <Link to="/auth" className={styles.loginButton}>
                Login
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
