import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/header/header";
import Home from "./pages/home";
import Coin from "./pages/coin";
import "./App.css";
import Footer from "./components/footer/footer";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;