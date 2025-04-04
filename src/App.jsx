import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/Homepage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import "./App.scss";
import Header from "./components/Header/Header";
import Predictions from "./pages/Predictions/Predictions";
import Leagues from "./pages/Leagues/Leagues";
import Footer from "./components/Footer/Footer";
import LeagueStandings from "./pages/LeagueStandings/LeagueStandings";
import HowToPlay from "./pages/HowToPlay/HowtoPlay";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/predictions"
            element={
              <Predictions
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
              />
            }
          />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/league-standings" element={<LeagueStandings />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
