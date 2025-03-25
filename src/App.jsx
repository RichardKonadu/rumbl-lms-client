import { useState } from "react";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.scss";
import Header from "./components/Header/Header";
import Predictions from "./pages/Predictions/Predictions";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/predictions" element={<Predictions />} />
      </Routes>
    </BrowserRouter>
  );
}
