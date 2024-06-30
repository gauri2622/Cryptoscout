import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Checkbox,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAuth } from "firebase/auth";
import { Crypto } from "../../CryptoContext";
import { getDatabase, ref, get, set } from "firebase/database";
import axios from "axios";
import { SingleCoin, CoinList } from "../../config/api";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { moneyFormat } from "../banner/carousel";

const useStyles1 = makeStyles(() => ({
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
    color:"white !important",

  },
  tableCell: {
    fontFamily: "Work Sans !important",
    borderBottom: "1px solid #5cbbff14 !important",
    fontSize: "1rem !important",
    color:"white !important",
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

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  paper: {
    padding: "2rem",
    borderRadius: "1.5rem",
    backgroundColor: "transparent !important",
    color: "white",
  },
  headline: {
    fontFamily: "Inter",
    margin: "2rem 0",
    fontWeight: "bold",
    color: "white",
  },
  tableContainer: {
    margin: "2rem 0",
    borderRadius: "1.5rem",
    backgroundColor: "transparent",
  },
  table: {
    minWidth: 650,
    backgroundColor: "white",
  },
  tableHeadCell: {
    fontFamily: "Work Sans",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
  },
  tableCell: {
    fontFamily: "Work Sans",
    fontSize: "0.9rem",
    padding: "0.8rem",
    backgroundColor: "transparent",
    color: "white",
  },
  coinListContainer: {
    height: "400px",
    overflowY: "auto",
    margin: "2rem 0",
    borderRadius: "1.5rem",
    padding: "1rem",
    backgroundColor: "transparent",
  },
  coinBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    padding: "1rem",
    margin: "0.5rem",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  coinImage: {
    maxWidth: 50,
    marginBottom: "1rem",
    color: "white",
  },
  coinName: {
    fontWeight: "bold",
  },
  row: {
    transition: "background-color .2s ease-out",
    "&:hover": { backgroundColor: "#f0f0f0" },
    color: "white",
  },
  checkbox: {
    alignSelf: "flex-start",
    color: "white",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.4rem",
    color: "white",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const styles = useStyles1();
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [loadingSelectedCoins, setLoadingSelectedCoins] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loadingAllCoins, setLoadingAllCoins] = useState(true);
  const [selectedAllCoins, setSelectedAllCoins] = useState([]);
  const { currency, symbol } = useContext(Crypto);

  useEffect(() => {
    const fetchSelectedCoins = async () => {
      try {
        setLoadingSelectedCoins(true);

        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        const db = getDatabase();
        const userRef = ref(db, `users/${userId}/selectedCoins`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userSelectedCoins = snapshot.val();
          setSelectedCoins(userSelectedCoins);
        } else {
          setSelectedCoins([]);
        }

        setLoadingSelectedCoins(false);
      } catch (error) {
        console.error("Error fetching selected coins:", error.message);
        setLoadingSelectedCoins(false);
      }
    };

    fetchSelectedCoins();
  }, []);

  useEffect(() => {
    const fetchCoinData = async (coinId) => {
      try {
        const response = await axios.get(SingleCoin(coinId));
        return response.data;
      } catch (error) {
        console.error(`Error fetching coin data for ${coinId}:`, error.message);
        return null;
      }
    };

    const fetchCoins = async () => {
      try {
        const coinDataPromises = selectedCoins.map(fetchCoinData);
        const resolvedCoinData = await Promise.all(coinDataPromises);
        console.log(resolvedCoinData);
        setCoinData(resolvedCoinData.filter(Boolean));
      } catch (error) {
        console.error("Error fetching coin data:", error.message);
      }
    };

    if (selectedCoins.length > 0) {
      fetchCoins();
    }
  }, [selectedCoins]);

  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        const { data } = await axios.get(CoinList(currency));
        setAllCoins(data.filter((coin) => !selectedCoins.includes(coin.id)));
      } catch (error) {
        console.error("Error fetching all coins:", error.message);
      } finally {
        setLoadingAllCoins(false);
      }
    };

    fetchAllCoins();
  }, [selectedCoins]);

  const addSelectedCoin = async (coinId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/selectedCoins`);

      const snapshot = await get(userRef);
      const currentSelectedCoins = snapshot.exists() ? snapshot.val() : [];

      if (!currentSelectedCoins.includes(coinId)) {
        const updatedSelectedCoins = [...currentSelectedCoins, coinId];
        await set(ref(db, `users/${userId}/selectedCoins`), updatedSelectedCoins);
        setSelectedCoins(updatedSelectedCoins);
      } else {
        console.log("Coin already exists in selectedCoins.");
      }
    } catch (error) {
      console.error("Error adding selected coin:", error.message);
    }
  };

  const removeSelectedCoin = async (coinId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;

      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/selectedCoins`);

      const snapshot = await get(userRef);
      const currentSelectedCoins = snapshot.exists() ? snapshot.val() : [];

      if (currentSelectedCoins.includes(coinId)) {
        const updatedSelectedCoins = currentSelectedCoins.filter(
          (selectedCoin) => selectedCoin !== coinId
        );
        await set(ref(db, `users/${userId}/selectedCoins`), updatedSelectedCoins);
        setSelectedCoins(updatedSelectedCoins);
      } else {
        console.log("Coin not found in selectedCoins.");
      }
   

    } catch (error) {
      console.error("Error removing selected coin:", error.message);
    }
  };

  return (
    <Container component="main" className={classes.container}>
      <Paper elevation={3} className={classes.paper} sx={{ backgroundColor: 'transparent !important' }}>
        <Typography variant="h4" className={classes.headline}>
          Dashboard
        </Typography>
        {loadingSelectedCoins ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {selectedCoins.length > 0 ? (
              <TableContainer className={styles.tableContainer}>
              <Table className={styles.table}>
                <TableHead sx={{
                    backgroundColor: "#c6b4ff29",
                  }}>
                  <TableRow>
                    <TableCell align="center" className={styles.theadCell}>Coin</TableCell>
                    <TableCell align="center" className={styles.theadCell}>Price</TableCell>
                    <TableCell align="center" className={styles.theadCell}>24h Change</TableCell>
                    <TableCell align="center" className={styles.theadCell}>Market Cap</TableCell>
                    <TableCell align="center" className={styles.theadCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coinData.map((coin) => (
                    <TableRow key={coin.id} className={styles.row}>

                      <TableCell className={styles.tableCell}>                            
                      <div className={styles.coinCell}>
                              <img
                                src={coin?.image?.small}
                                alt={coin.name}
                                className={styles.coinImage}
                              />
                              <div className={styles.coinText}>
                                {coin.symbol}
                                <span
                                  style={{
                                    textTransform: "capitalize",
                                    textAlign: "left",
                                    fontWeight: 400,
                                    fontSize: 14.5,
                                  }}
                                >
                                  {coin.name}
                                </span>
                              </div>
                            </div>
                      
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      {symbol + " "}
                        {coin.market_data?.current_price?.[currency] || "Loading..."}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <span
                              style={{
                                color: coin.market_data?.price_change_percentage_24h > 0 ? "#82ff82" : "#ff2828",
                              }}
                            >
                      
                        {coin.market_data?.price_change_percentage_24h || "Loading..."}%
                        </span>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {symbol + " "}
                        {moneyFormat(coin.market_data?.market_cap?.usd.toFixed(2))|| "Loading..."}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <IconButton
                          className={classes.button}
                          onClick={() => removeSelectedCoin(coin.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            ) : (
              <Typography variant="body1">No selected coins found.</Typography>
            )}
          </>
        )}
        {loadingAllCoins ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className={classes.coinListContainer}>
            <Typography variant="h4" className={classes.headline}>
              All Coins
            </Typography>
            <Grid container spacing={2}>
              {allCoins.map((coin) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
                  <Box className={classes.coinBox}>
                    <Checkbox
                      className={classes.checkbox}
                      checked={selectedAllCoins.includes(coin.id)}
                      onChange={() => {
                        const updatedSelectedCoins = selectedAllCoins.includes(coin.id)
                          ? selectedAllCoins.filter((selectedCoin) => selectedCoin !== coin.id)
                          : [...selectedAllCoins, coin.id];
                        setSelectedAllCoins(updatedSelectedCoins);
                      }}
                    />
                    <img src={coin.image} alt={coin.name} className={classes.coinImage} />
                    <Typography variant="h6" className={classes.coinName}>
                      {coin.name}
                    </Typography>
                    <Typography variant="body2">{coin.symbol.toUpperCase()}</Typography>
                    <IconButton className={classes.button} onClick={() => addSelectedCoin(coin.id)}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
