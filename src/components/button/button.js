import React from "react";
import { withStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Button = ({ children, selected, onClick }) => {
  const responsiveStyles = ({ breakpoints }) => ({
    button: {
      fontFamily: "Work Sans !important",
      padding: 10,
      paddingLeft: 55,
      paddingRight: 55,
      cursor: "pointer",
      border: "1px solid #8276ff",
      borderRadius: ".6rem",
      backgroundColor: selected ? "#8276ff" : "",
      color: selected ? "black" : "white",
      transition: "all .5s ease-out",
      "&:hover": {
        backgroundColor: "#8276ff",
        color: "black",
      },
      [theme.breakpoints.down("md")]: {
        display: "flex",
        fontSize: 15,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
      },
      [theme.breakpoints.down("sm")]: {
        padding: 8,
        paddingLeft: 10,
        paddingRight: 30,
        margin: "0 3px",
      },
    },
  });

  const MyButton = (props) => {
    return (
      <span onClick={props.onClick} className={props.classes.button}>
        {props.children}
      </span>
    );
  };

  const theme = createTheme();
  const StyledButton = withStyles(responsiveStyles)(MyButton);

  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </ThemeProvider>
  );
};

export default Button;
