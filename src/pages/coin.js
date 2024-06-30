import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { Crypto } from "../CryptoContext";
import { Container, LinearProgress, Typography } from "@mui/material";
import CoinInfo from "../components/coin/coinInfo";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import parse from "html-react-parser";
import { moneyFormat } from "../components/banner/carousel";

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Crypto);

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(coin);

  const responsiveStyles = ({ breakpoints }) => ({
    container: {
      display: "flex !important",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "baseline",
      },
    },
    sidebar: {
      width: "35%",
      [theme.breakpoints.down("md")]: {
        width: "-webkit-fill-available",
        marginBottom: 25,
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      padding: "1rem 2rem",
      borderRadius: "1.5rem",
      background: "#ffffff21",
    },
    marketData: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "0 1rem",
      paddingTop: 25,
      borderTop: "1px solid #ffffff36",
      [theme.breakpoints.down("md")]: {
        justifyContent: "space-around",
        flexDirection: "row",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column !important",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  });

  const useStyles = makeStyles(() => ({
    heading: {
      fontFamily: "Inter !important",
      fontWeight: "700 !important",
      marginBottom: "20px !important",
    },
    description: {
      width: "100%",
      marginBottom: "20px !important",
      textAlign: "justify",
      fontFamily: "Work Sans !important",
    },
    marketData: {
      fontFamily: "Work Sans !important",
      marginBottom: "20px !important",
    },
    marketDataHeading: {
      fontFamily: "Work Sans !important",
      marginBottom: "20px !important",
      fontWeight: "bold !important",
    },
  }));

  const MyContainer = (props) => {
    return (
      <Container className={props.classes.container}>
        {props.children}
      </Container>
    );
  };

  const Sidebar = (props) => {
    return <div className={props.classes.sidebar}>{props.children}</div>;
  };

  const MarketData = (props) => {
    return <div className={props.classes.marketData}>{props.children}</div>;
  };

  const StyledContainer = withStyles(responsiveStyles)(MyContainer);
  const StyledSidebar = withStyles(responsiveStyles)(Sidebar);
  const StyledMarketData = withStyles(responsiveStyles)(MarketData);

  const styles = useStyles();
  const theme = createTheme();

  if (!coin) return <LinearProgress />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledContainer>
          <StyledSidebar>
            <img
              src={coin?.image.large}
              alt={coin?.name}
              style={{
                marginBottom: 25,
                maxWidth: "50%",
                borderRadius: "1rem",
                marginTop: 5,
              }}
            />
            <Typography variant="h4" className={styles.heading}>
              {coin?.name}
            </Typography>
            <Typography variant="subtitle1" className={styles.description}>
              {parse(String(coin?.description.en.split(". ")[0]))}
            </Typography>
            <StyledMarketData>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.marketDataHeading}
                >
                  Rank :
                </Typography>{" "}
                &nbsp;
                <Typography variant="subtitle1" className={styles.marketData}>
                  {coin?.market_cap_rank || "-"}
                </Typography>{" "}
                &nbsp;
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.marketDataHeading}
                >
                  Current Price :
                </Typography>{" "}
                &nbsp;
                <Typography variant="subtitle1" className={styles.marketData}>
                  {symbol}{" "}
                  {moneyFormat(
                    parseInt(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )
                  )}
                </Typography>{" "}
                &nbsp;
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.marketDataHeading}
                >
                  Market Cap :
                </Typography>{" "}
                &nbsp;
                <Typography variant="subtitle1" className={styles.marketData}>
                  {symbol}{" "}
                  {moneyFormat(
                    parseInt(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                    )
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </Typography>{" "}
                &nbsp;
              </span>
            </StyledMarketData>
          </StyledSidebar>
          <CoinInfo coin={coin} />
        </StyledContainer>
      </ThemeProvider>
    </>
  );
};

export default Coin;
