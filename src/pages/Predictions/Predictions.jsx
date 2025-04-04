import axios from "axios";
import { useEffect, useState } from "react";
import Fixtures from "../../components/Fixtures/Fixtures";
import "../Predictions/Predictions.scss";
import TeamButton from "../../components/TeamButton/TeamButton";
import backSVG from "../../assets/icons/back.svg";
import nextSVG from "../../assets/icons/next.svg";
import Modal from "../../components/Modal/Modal";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Predictions({ setIsModalOpen, isModalOpen }) {
  const [isLoading, setIsLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState("");
  const [gameweek, setGameweek] = useState(30);
  const [previousPredictions, setPreviousPredictions] = useState(null);
  const [previouslyPredicted, setPreviouslyPredicted] = useState(false);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        if (error.response.status === 401) {
          setError("You must be logged in to make predictions");
        } else {
          setError("An error occurred while fetching predictions");
        }
      }
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
      if (error.status === 401) {
        setError("You must be logged in to make a prediction");
        setIsLoading(false);
      }
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
      if (error.status === 401) {
        setError("You must be logged in to view previous predictions");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFixtures();
    fetchTeams();
    getPredictions();
    fetchLeagues();
  }, [gameweek, selectedLeague]);

  if (error) {
    return (
      <div className="error__wrapper">
        <p className="error">{error}</p>
        <Link className="error__cta" to="/signup">
          Signup
        </Link>
        <Link className="error__cta" to="/login">
          Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <BounceLoader
        className="loading"
        color="rgb(3, 29, 100)"
        loading={isLoading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (!fixtures || !teamsData || !previousPredictions || !leagues) {
    return (
      <BounceLoader
        className="loading"
        color="rgb(3, 29, 100)"
        loading={isLoading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="predictions__wrapper">
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
            previouslyPredicted={previouslyPredicted}
          />
        )}

        {selectedLeague && (
          <>
            <p className="previous__title">Previoulsy picked teams</p>
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
          </>
        )}
        {selectedLeague && (
          <>
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
                    previousPredictions={previousPredictions}
                    setPreviouslyPredicted={setPreviouslyPredicted}
                  />
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
