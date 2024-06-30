import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { Crypto } from "../../CryptoContext";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { CircularProgress } from "@mui/material";

export function moneyFormat(rawMoney) {
  return rawMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(Crypto);
  const [loading, setLoading] = useState(false);

  const fetchTrendingCoins = async () => {
    try {
      setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    setLoading(false);
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      justifyContent: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      overflow: "hidden",
      justifyContent: "space-between",
      padding: "1rem",
      transition: "all .3s ease-out",
      "&:hover": {
        background: "#ffffff0d",
        borderRadius: "2rem",
      },
    },
    badge: {
      fontSize: "12px",
      textTransform: "capitalize",
      position: "absolute",
      background: "linear-gradient(90deg, #5946d3, #85377b, transparent)",
      fontFamily: "Work Sans",
      padding: "0.3rem 1.5rem 0.3rem .5rem",
      borderRadius: "1rem 1rem 2.5rem 1rem",
      marginLeft: " 5rem",
      backdropFilter: "blur(2px)",
    },
  }));

  const styles = useStyles();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <div key={coin.id}>
        <Link
          className={styles.carouselItem}
          to={`/coin/${coin.id}`}
          key={coin.name}
        >
          <span className={styles.badge}>Trending</span>
          <img
            src={coin?.image}
            alt={coin.name}
            height="100"
            width={100}
            style={{ marginBottom: 10 }}
          />
          <span style={{ fontFamily: "Inter", padding: ".5rem 0" }}>
            {coin?.symbol} &nbsp;
            <span
              style={{
                color: profit > 0 ? "#82ff82" : "#ff2828",
              }}
            >
              {profit && "+".replace(" ", "")}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>

          <span
            style={{
              textTransform: "capitalize",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {symbol + " "}
            {moneyFormat(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      </div>
    );
  });

  const settings = {
    centerMode: true,
    swipeToSlide: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1300,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.carousel}>
      {loading ? (
        <CircularProgress
          sx={{
            width: "70px !important",
            height: "70px !important",
            marginTop: "2rem",
          }}
        />
      ) : (
        <Slider
          {...settings}
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            margin: "3rem 0 1rem 0",
          }}
        >
          {items}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
