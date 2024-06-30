import React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import { FiGithub } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { makeStyles } from "@mui/styles";

const Footer = () => {
  const useStyles = makeStyles(() => ({
    iconGroup: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      cursor: "pointer",
      overflow: "hidden",
    },
    icon: {
      color: "white",
      overflow: "inherit",
      backgroundColor: "#a496ff26",
      padding: "10px",
      display: "flex",
      transition: "all .2s ease-out",
      borderRadius: ".5rem",
      "&:hover": {
        backgroundColor: "#302480",
        borderRadius: "50%",
      },
    },
  }));

  const styles = useStyles();

  return (
    <Box>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "1.5rem .5rem",
            }}
          >
            <Typography
              variant="subtitle"
              style={{
                fontFamily: "Inter",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#6e5be9",
                  textUnderlineOffset: "10%",
                }}
              >
               <a href="https://flareglobalsoft.com/">Flare Global Soft</a>
              </span>{" "}
              &copy; 2024
            </Typography>
            {/* <div className={styles.iconGroup}>
              <a
                rel="noreferrer"
                href="https://github.com/justnada"
                target={"_blank"}
                style={{ fontSize: 23 }}
                className={styles.icon}
              >
                <FiGithub />
              </a>
              <a
                rel="noreferrer"
                href="https://www.instagram.com/nadayumnaa/"
                target={"_blank"}
                style={{
                  fontSize: 25,
                  marginLeft: 10,
                }}
                className={styles.icon}
              >
                <FaInstagram />
              </a>
            </div> */}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
