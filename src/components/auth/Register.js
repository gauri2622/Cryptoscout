import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Paper, Snackbar } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import axios from "axios";
import { CoinList } from "../../config/api";
import CoinModal from "./CoinModal";
import { app } from "./firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedCoins: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coinModalOpen, setCoinModalOpen] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(CoinList("usd"));
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (coinId) => {
    const selectedCoins = formData.selectedCoins.includes(coinId)
      ? formData.selectedCoins.filter((id) => id !== coinId)
      : [...formData.selectedCoins, coinId];

    setFormData({ ...formData, selectedCoins });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, username, selectedCoins } = formData;

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (selectedCoins.length === 0) {
      console.error("Select at least one coin");
      setSnackbarMessage("Select at least one coin");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
        selectedCoins: selectedCoins,
      });

      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error registering:", error.message);
      setSnackbarMessage(`Error registering: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openCoinModal = () => {
    setCoinModalOpen(true);
  };

  const closeCoinModal = () => {
    setCoinModalOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "transparent" }}>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Username"
            name="username"
            variant="filled"
            margin="normal"
            required
            fullWidth
            autoFocus
            onChange={handleChange}
            sx={commonTextFieldStyles}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="filled"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            sx={commonTextFieldStyles}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="filled"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            sx={commonTextFieldStyles}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="filled"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            sx={commonTextFieldStyles}
          />
          {loading ? (
            <p>Loading coins...</p>
          ) : (
            <div style={textColor}>
              <p >Select coins for registration:</p>
              <Button variant="outlined" color="primary" onClick={openCoinModal} style={{ marginBottom: "1rem",marginTop:"1rem" }}>
                Select Coins
              </Button>
            </div>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
            Register
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{
          backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
        }}
      />

      <CoinModal isOpen={coinModalOpen} onClose={closeCoinModal} coins={coins} selectedCoins={formData.selectedCoins} handleCheckboxChange={handleCheckboxChange} />
    </Container>
  );
};
const commonTextFieldStyles = {
  width: "100%",
  borderRadius: ".5rem",
  fontFamily: "Work Sans !important",
  "& label": { fontFamily: "Work Sans !important", color: "#FFFFF7" },
  "& .MuiInputBase-input": { color: "white" },
};

const textColor = {
  color:"#FFFFF7"
}
const commonTextFieldContainerStyles = {
  marginBottom: "3rem",
};
export default Register;