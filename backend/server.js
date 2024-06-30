const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const COIN_GECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

app.get('/api/coins/markets', async (req, res) => {
  const { currency } = req.query;
  try {
    const response = await axios.get(`${COIN_GECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/coins/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${COIN_GECKO_BASE_URL}/coins/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/coins/:id/market_chart', async (req, res) => {
  const { id } = req.params;
  const { days = 365, currency } = req.query;
  try {
    const response = await axios.get(`${COIN_GECKO_BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/trending', async (req, res) => {
    const { currency } = req.query;
    try {
      const response = await axios.get(`${COIN_GECKO_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: currency,
          order: 'gecko_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching trending coins:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
