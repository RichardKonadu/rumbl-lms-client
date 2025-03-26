import axios from "axios";
import { useEffect, useState } from "react";
import Fixtures from "../../components/Fixtures/Fixtures";
import "../Predictions/Predictions.scss";
import TeamButton from "../../components/TeamButton/TeamButton";

export default function Predictions() {
  const [teamsData, setTeamsData] = useState("");
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState("");
  const [predictedTeam, setPredictedTeam] = useState({
    name: "",
    id: "",
    abbr: "",
  });

  const fetchFixtures = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fixtures`
      );
      setFixtures(data);
    } catch (error) {
      throw error;
    }
  };

  const fetchTeams = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/teams`
      );
      setTeamsData(data);
    } catch (error) {
      throw error;
    }
  };

  const handlePredictedTeam = (team) => {
    setPredictedTeam({
      ...predictedTeam,
      id: team.id,
      name: team.name,
      abbr: team.abbr,
    });
  };

  const handleSubmit = () => {
    sendPrediction();
  };

  const sendPrediction = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/predictions`,
        {
          team_id: predictedTeam.id,
          league_id: 1,
          game_week: 1,
        },
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      setError("You must be logged in to view this page");
    }
  };

  useEffect(() => {
    fetchFixtures();
    fetchTeams();
    sendPrediction();
  }, []);

  if (!fixtures) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="fixtures__wrapper">
      <h2 className="fixtures__title">Fixtures</h2>
      <ul className="fixture__list">
        {fixtures.map((fixture, index) => {
          return <Fixtures key={index} fixture={fixture} />;
        })}
      </ul>
      <ul className="predictions">
        {teamsData.map((team, index) => {
          return (
            <TeamButton
              key={index}
              team={team}
              handlePredictedTeam={handlePredictedTeam}
            />
          );
        })}
      </ul>
      <button onClick={handleSubmit}></button>
    </div>
  );
}
