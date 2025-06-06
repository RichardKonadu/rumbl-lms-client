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
      if (error.response) {
        if (error.response.status === 401) {
          setError("You must be logged in to view league standings");
        } else if (error.response.status === 404) {
          setError(error);
        }
      }
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
        <p className="error">You must be logged in to view league standings.</p>
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
          You are not part of any leagues to view league standings.
        </p>
        <Link className="error__cta" to="/leagues">
          Join Leagues
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
                <div className="key__wrapper">
                  <div className="key__item">
                    <img
                      className="key__icon"
                      src={"/icons/green-circle.svg"}
                      alt=""
                    />

                    <p> = Won</p>
                  </div>
                  <div className="key__item">
                    <img
                      className="key__icon"
                      src={"/icons/red-circle.svg"}
                      alt=""
                    />

                    <p>= Lost</p>
                  </div>
                  {/* <div className="key__item">
                    <img
                      className="key__icon"
                      src={"/src/assets/icons/eliminated.svg"}
                      alt=""
                    />

                    <p>= Eliminated</p>
                  </div> */}
                </div>
              </div>
              <ul className="gameweek__ul">
                <li className="gameweek__user">GW</li>
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
