import { useEffect, useState } from "react";
import "./LeagueStandings.scss";
import axios from "axios";
import UserResults from "../../components/UserResults/UserResults";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function LeagueStandings() {
  const [leagues, setLeagues] = useState("");
  const [error, setError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [predictionResults, setPredictionResults] = useState(null);
  const [leagueUsers, setLeagueUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authToken");

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
    } catch (error) {
      setError("You must be logged in to view league standings");
    }
  };

  const handleSelectedLeague = async (e) => {
    if (e.target.value !== "") {
      setSelectedLeague(e.target.value);
      fetchPredictions(e.target.value);
    } else {
      setError("You must select a league to see predictions");
      setSelectedLeague("");
    }
  };

  const fetchPredictions = async (leagueId) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/predictions/results?leagueId=${leagueId}`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setPredictionResults(data);
      fetchLeagueUsers(leagueId);
    } catch (error) {
      setError("No predictions found");
    }
  };

  const fetchLeagueUsers = async (leagueId) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/leagueuser/users?leagueId=${leagueId}`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setLeagueUsers(data);
    } catch (error) {
      setError("No users for selected league found");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

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

  if (!leagues) {
    return <BounceLoader />;
  }

  return (
    <div className="league__standings">
      <h1 className="gameweek__title">League Standings</h1>
      <select onChange={handleSelectedLeague} name="selected_league">
        <option value=""> Select League</option>;
        {leagues.map((league) => {
          return (
            <option key={league.league_id} value={league.league_id}>
              {league.name}
            </option>
          );
        })}
      </select>
      <section>
        {predictionResults && selectedLeague && (
          <section className="gameweek__scroll-wrapper">
            <>
              <div className="key">
                <p className="gameweek__title">Gameweek</p>
                <div className="key__wrapper">
                  <img
                    className="key__icon"
                    src={"/src/assets/icons/green-circle.svg"}
                    alt=""
                  />

                  <p> = Won</p>
                  <img
                    className="key__icon"
                    src={"/src/assets/icons/red-circle.svg"}
                    alt=""
                  />

                  <p>= Lost</p>
                </div>
              </div>
              <ul className="gameweek__ul">
                <li className="gameweek__user"></li>
                {predictionResults
                  .filter(
                    (prediction, index, self) =>
                      index ===
                      self.findIndex(
                        (p) => p.game_week === prediction.game_week
                      )
                  )
                  .map((prediction) => (
                    <li className="gameweek__number" key={prediction.id}>
                      {prediction.game_week}
                    </li>
                  ))}
              </ul>
            </>
            {leagueUsers.map((user, index) => {
              return (
                <UserResults
                  user={user}
                  key={index}
                  selectedLeague={selectedLeague}
                  predictionResults={predictionResults}
                />
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
}
