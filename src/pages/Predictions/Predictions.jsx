import axios from "axios";
import { useEffect, useState } from "react";
import Fixtures from "../../components/Fixtures/Fixtures";
import "../Predictions/Predictions.scss";
import TeamButton from "../../components/TeamButton/TeamButton";
import backSVG from "../../assets/icons/back.svg";
import nextSVG from "../../assets/icons/next.svg";
import Modal from "../../components/Modal/Modal";
import { data } from "react-router-dom";
import Leagues from "../Leagues/Leagues";
import { BounceLoader } from "react-spinners";

export default function Predictions({ setIsModalOpen, isModalOpen }) {
  const [teamsData, setTeamsData] = useState([]);
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState("");
  const [gameweek, setGameweek] = useState(30);
  const [previousPredictions, setPreviousPredictions] = useState(null);
  const [leagues, setLeagues] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [predictedTeam, setPredictedTeam] = useState({
    name: "",
    id: "",
    abbr: "",
  });

  const fetchFixtures = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fixtures?gameweek=${gameweek}`
      );
      setFixtures(data);
    } catch (error) {
      throw error;
    }
  };

  const fetchLeagues = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/leagueuser`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setLeagues(data);
    } catch (error) {
      console.log("test");
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

  const handleGameweek = (direction) => {
    if (direction === "back") {
      setGameweek(gameweek - 1);
    } else {
      setGameweek(gameweek + 1);
    }
  };

  const handleSelectedLeague = (e) => {
    setSelectedLeague(e.target.value);
  };

  const handlePredictionSubmission = () => {
    sendPrediction();
  };

  const sendPrediction = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/predictions`,
        {
          team_id: predictedTeam.id,
          league_id: selectedLeague,
          game_week: gameweek,
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

  const getPredictions = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/predictions/${selectedLeague}`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setPreviousPredictions(data);
    } catch (error) {
      setError("No predictions found");
    }
  };

  useEffect(() => {
    fetchFixtures();
    fetchTeams();
    getPredictions();
    fetchLeagues();
  }, [gameweek, selectedLeague]);

  if (!fixtures) {
    return (
      <BounceLoader
        color="rgb(3, 29, 100)"
        loading={BounceLoader}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (!teamsData) {
    return <p className="loading">Loading...</p>;
  }

  if (!previousPredictions) {
    return <p className="loading">Loading...</p>;
  }

  if (!leagues) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="fixtures__wrapper">
      <select
        className="dropdown"
        onChange={(e) => handleSelectedLeague(e)}
        name=""
        id={leagues.id}
      >
        <option value="">Select League</option>
        {leagues.map((league, index) => {
          return (
            <option key={index} value={league.league_id}>
              {league.name}
            </option>
          );
        })}
      </select>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          predictedTeam={predictedTeam}
          handlePredictionSubmission={handlePredictionSubmission}
        />
      )}

      {selectedLeague && (
        <ul className="predictions">
          {previousPredictions.map((prediction, index) => {
            return (
              <TeamButton
                key={index}
                prediction={prediction}
                teamsData={teamsData}
              />
            );
          })}
        </ul>
      )}

      <h2 className="fixtures__title">Fixtures</h2>
      <div className="gameweek">
        <img
          onClick={() => handleGameweek("back")}
          className="gameweek__icons"
          src={backSVG}
          alt="previous gameweek"
        />
        <h3 className="gameweek__title">GW {gameweek} </h3>
        <img
          onClick={() => handleGameweek("forward")}
          className="gameweek__icons"
          src={nextSVG}
          alt="next gameweek"
        />
      </div>
      <ul
        className={`fixture__list ${
          isModalOpen ? "fixture__list--inactive" : ""
        }`}
      >
        {fixtures.map((fixture, index) => {
          return (
            <Fixtures
              setPredictedTeam={setPredictedTeam}
              predictedTeam={predictedTeam}
              key={index}
              fixture={fixture}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          );
        })}
      </ul>
    </div>
  );
}
