import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Checkbox, FormControlLabel, Grid, Typography, Box } from "@mui/material";
import axios from "axios";

const CoinModal = ({ isOpen, onClose, coins, selectedCoins, handleCheckboxChange, setCoins, TrendingCoins }) => {
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(TrendingCoins("usd"));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [TrendingCoins, setCoins]);

  return (
    <Dialog  open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{
        backgroundColor: "#303F9F",
        color: "#FFF",
        padding: "16px",
        borderBottom: "1px solid #455A64",
      }}>Choose Coins</DialogTitle>
      <DialogContent sx={{
        backgroundColor: "#ECEFF1",
        padding: "20px",
      }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {coins.map((coin) => (
              <Grid item key={coin.id} xs={6} md={4} lg={3}>
                <Box 
                  border="1px solid #CFD8DC" 
                  borderRadius="8px" 
                  padding="16px" 
                  boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                  bgcolor="#FFF"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCoins.includes(coin.id)}
                        onChange={() => handleCheckboxChange(coin.id)}
                        color="primary"
                      />
                    }
                    label={
                      <div>
                        <img src={coin.image} alt={coin.name} height="20" width="20" style={{ marginRight: 8 }} />
                        <Typography variant="body2">{coin.name}</Typography>
                      </div>
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoinModal;
