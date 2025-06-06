import axios from "axios";
import { useEffect, useState } from "react";
import Fixtures from "../../components/Fixtures/Fixtures";
import "../Predictions/Predictions.scss";
import TeamButton from "../../components/TeamButton/TeamButton";
import backSVG from "/icons/back.svg";
import nextSVG from "/icons/next.svg";
import Modal from "../../components/Modal/Modal";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Predictions({ setIsModalOpen, isModalOpen }) {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState("");
  const [gameweek, setGameweek] = useState(32);
  const [previousPredictions, setPreviousPredictions] = useState(null);
  const [previouslyPredicted, setPreviouslyPredicted] = useState(false);
  const [leagues, setLeagues] = useState(null);
  const [invalidGameweek, setInvalidGameweek] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [successfulPrediction, setSuccessfulPrediction] = useState(false);
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
        } else if (error.response.status === 404) {
          setError(error);
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
      setSuccessfulPrediction(true);
    } catch (error) {
      if (error.response.status === 401) {
        setError("You must be logged in to make a prediction");
        setIsLoading(false);
      } else if (error.response.status === 400) {
        setInvalidGameweek(true);
        setError("Invalid Gameweek");
      }
    }
  };

  const getPredictions = async () => {
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
      if (error.response) {
        if (error.response.status === 404) {
          setPreviousPredictions([]);
        } else if (error.response.status === 401) {
          setError("You must be logged in to view previous predictions");
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
    fetchTeams();
    getPredictions();
    fetchLeagues();
  }, [gameweek, selectedLeague]);

  if (!authToken) {
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

  if (error.status === 404) {
    return (
      <div className="error__wrapper">
        <p className="error">
          You are not part of any leagues to start making predictions.
        </p>
        <Link className="error__cta" to="/leagues">
          Join Leagues
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
        {leagues.length === 1 && leagues[0].league_id === 6 ? (
          <div className="error__wrapper">
            <p>
              You are not currently in any active leagues. please join a league
              to start making predictions.
            </p>
            <Link className="error__cta" to="/leagues">
              Join a League
            </Link>
          </div>
        ) : (
          <>
            <select
              className="dropdown"
              onChange={(e) => handleSelectedLeague(e)}
              name=""
            >
              <option value="">Select League</option>
              {leagues.map((league, index) => (
                <option key={index} value={league.league_id}>
                  {league.name}
                </option>
              ))}
            </select>
            {isModalOpen && (
              <Modal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                predictedTeam={predictedTeam}
                handlePredictionSubmission={handlePredictionSubmission}
                previouslyPredicted={previouslyPredicted}
                setInvalidGameweek={setInvalidGameweek}
                invalidGameweek={invalidGameweek}
                successfulPrediction={successfulPrediction}
                setSuccessfulPrediction={setSuccessfulPrediction}
              />
            )}
            {selectedLeague && (
              <>
                {previousPredictions && previousPredictions.length > 0 ? (
                  <>
                    <p className="previous__title">Previously picked teams</p>
                    <ul className="predictions">
                      {previousPredictions.map((prediction, index) => (
                        <TeamButton
                          key={index}
                          prediction={prediction}
                          teamsData={teamsData}
                        />
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>No previous predictions</p>
                )}
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
                  {fixtures.map((fixture, index) => (
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
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
