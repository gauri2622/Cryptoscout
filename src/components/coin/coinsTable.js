import React, { useState, useEffect, useContext } from "react";
import { CoinList } from "../../config/api";
import axios from "axios";
import { Crypto } from "../../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { moneyFormat } from "../banner/carousel";

const useStyles = makeStyles(() => ({
  container: {
    boxShadow: [
      "0px 0px 1.4px rgba(0, 0, 0, 0.015)",
      "0px 0px 3.1px rgba(0, 0, 0, 0.015)",
      " 0px 0px 5.3px rgba(0, 0, 0, 0.015)",
      "0px 0px 8.2px rgba(0, 0, 0, 0.015)",
      " 0px 0px 12.2px rgba(0, 0, 0, 0.015)",
      "0px 0px 17.9px rgba(0, 0, 0, 0.015)",
      " 0px 0px 26.8px rgba(0, 0, 0, 0.015)",
      "0px 0px 42.7px rgba(0, 0, 0, 0.015)",
      "  0px 0px 80px rgba(0, 0, 0,0.015)",
    ],
    backgroundColor: "#ffffff0a",
    textAlign: "center",
    borderRadius: "1.5rem",
    padding: "1rem",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  headline: {
    fontFamily: "Inter !important",
    margin: "2.5rem 0 3.5rem 0 !important",
    fontWeight: "bold !important",
  },
  searchBox: {
    width: "100%",
    borderRadius: ".5rem",
    fontFamily: "Work Sans !important",
    "& label": { fontFamily: "Work Sans !important" },
  },
  tableContainer: {
    margin: "2rem 0",
    backgroundColor: "#ffffff0f",
    borderRadius: "1.5rem",
  },
  table: {
    minWidth: 650,
  },
  theadCell: {
    fontFamily: "Work Sans !important",
    borderBottom: "none !important",
    fontSize: "1.1rem !important",
    padding: "1.2rem 0 !important",
  },
  tableCell: {
    fontFamily: "Work Sans !important",
    borderBottom: "1px solid #5cbbff14 !important",
    fontSize: "1rem !important",
  },
  coinCell: {
    display: "flex",
    alignItems: "center",
  },
  coinImage: {
    maxWidth: 50,
    margin: "0 1rem 0 2rem",
  },
  coinText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  row: {
    transition: "background-color .2s ease-out",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#b8a0ff29" },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = useContext(Crypto);
  const styles = useStyles();
  const navigate = useNavigate();

  console.log(search);

  const fetchCoins = async () => {
    try {
      setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <Container className={styles.container}>
          <Typography variant="h4" className={styles.headline}>
          Displaying Cryptocurrency Prices Sorted by{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#6e5be9",
                textUnderlineOffset: "10%",
                textDecorationThickness: 4,
              }}
            >
              {" "}
              Market Capitalization
            </span>
          </Typography>
          <TextField
            className={styles.searchBox}
            variant="filled"
            label="Search Any Crypto Currency.."
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer className={styles.tableContainer}>
            {loading ? (
              <LinearProgress />
            ) : (
              <Table className={styles.table}>
                <TableHead
                  sx={{
                    backgroundColor: "#c6b4ff29",
                  }}
                >
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          key={head}
                          align="center"
                          className={styles.theadCell}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          className={styles.row}
                          key={row.name}
                          onClick={() => navigate(`/coin/${row.id}`)}
                        >
                          <TableCell
                            align="center"
                            className={styles.tableCell}
                            width={300}
                          >
                            <div className={styles.coinCell}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                className={styles.coinImage}
                              />
                              <div className={styles.coinText}>
                                {row.symbol}
                                <span
                                  style={{
                                    textTransform: "capitalize",
                                    textAlign: "left",
                                    fontWeight: 400,
                                    fontSize: 14.5,
                                  }}
                                >
                                  {row.name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={styles.tableCell}
                          >
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {symbol + " "}
                              {moneyFormat(row?.current_price.toFixed(2))}
                            </span>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={styles.tableCell}
                          >
                            <span
                              style={{
                                color: profit > 0 ? "#82ff82" : "#ff2828",
                              }}
                            >
                              {profit && "+".replace(" ", "")}
                              {row?.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={styles.tableCell}
                          >
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {symbol + " "}
                              {moneyFormat(row?.market_cap)}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
  count={parseInt(handleSearch().length / 10, 10)}
  sx={{ display: "flex", justifyContent: "flex-end" }}
  onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 500);
  }}
/>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CoinsTable;
