import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../../CryptoContext";
import { HistoricalChart } from "../../config/api";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { Container, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data";
import Button from "../button/button";

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(Crypto);
  const [flag, setFlag] = useState(false);

  const fetchHistoricalChart = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricalData(data.prices);
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchHistoricalChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const responsiveStyles = ({ breakpoints }) => ({
    container: {
      background: "#ffffff21",
      borderRadius: "1.5rem",
      width: "75%",
      display: "flex !important",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      marginLeft: "1rem !important",
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        marginLeft: "0 !important",
        padding: 20,
        paddingTop: 0,
      },
    },
  });

  const MyContainer = (props) => {
    return (
      <Container className={props.classes.container}>
        {props.children}
      </Container>
    );
  };

  const StyledContainer = withStyles(responsiveStyles)(MyContainer);
  const theme = createTheme();

  // Chart Data
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#976cff57");
    gradient.addColorStop(0.5, "#976cff2e");
    gradient.addColorStop(1, "transparent");

    return {
      labels: historicalData.map((coin) => {
        let date = new Date(coin[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      }),
      datasets: [
        {
          data: historicalData.map((coin) => coin[1]),
          label: `Price (Past ${days} Days) in ${currency.toUpperCase()}`,
          borderColor: "#9978ff",
          borderWidth: 3,
          fill: {
            target: "origin",
            above: gradient,
          },
          color: "#9978ff",
        },
      ],
    };
  };

  // Chart Options
  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff94",
          font: {
            size: 14,
            family: "Work Sans",
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#ffffff94",
        },
      },
      x: {
        ticks: {
          color: "#ffffff94",
        },
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledContainer>
        {!historicalData | (flag === false) ? (
          <CircularProgress size={100} thickness={1} />
        ) : (
          <>
            <Line data={data} options={options} />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default CoinInfo;
