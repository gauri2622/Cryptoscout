import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Carousel from "./carousel";

const Banner = () => {
  const useStyles = makeStyles(() => ({
    bannerContent: {
      display: "flex !important",
      flexDirection: "column",
      overflow: "hidden",
    },
    tagLine: {
      display: "flex",
      flexDirection: "column",
      height: "50%",
      justifyContent: "center",
      textAlign: "center",
      overflow: "hidden",
      marginTop: "20px",
    },
  }));

  const styles = useStyles();

  return (
    <div>
      <Container className={styles.bannerContent}>
        <div className={styles.tagLine}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              fontFamily: "Inter",
              marginBottom: 30,
            }}
          >
            Crypto{" "}
            <span
              style={{
                fontFamily: "inherit",
                fontWeight: "inherit",
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "#6e5be9",
                textDecorationThickness: 10,
                textUnderlineOffset: "5%",
              }}
            >
              Scout
            </span>
          </Typography>
          <Typography
            style={{
              textTransform: "capitalize",
              fontFamily: "Work Sans",
              fontWeight: "lighter",
              lineHeight: 2,
              padding: "0 1rem",
            }}
          >
            "Efficiently Retrieve Comprehensive Information on Your Preferred Cryptocurrency with Our Services"
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
