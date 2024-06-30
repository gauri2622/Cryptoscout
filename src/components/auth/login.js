import React, { useState } from "react";
import { TextField, Button, Container, Paper, Snackbar, Box } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect to Dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setSnackbarMessage(`Error logging in: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        // Your existing styles
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "transparent" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box sx={commonTextFieldContainerStyles}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="filled"
              margin="normal"
              required
              fullWidth
              autoFocus
              onChange={handleChange}
              sx={commonTextFieldStyles}
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Box>
          <Box sx={commonTextFieldContainerStyles}>
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
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 16 }}
          >
            Login
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
    </Container>
  );
};

const commonTextFieldStyles = {
  width: "100%",
  borderRadius: ".5rem",
  fontFamily: "Work Sans !important",
  "& label": { fontFamily: "Work Sans !important", color: "#FFFFF7" },
  "& .MuiInputBase-input": { color: "white" }, // Ensuring the input text is white
};

const commonTextFieldContainerStyles = {
  marginBottom: "3rem",
};

export default Login;
