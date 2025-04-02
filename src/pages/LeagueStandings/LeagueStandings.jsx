import { useEffect, useState } from "react";
import "./LeagueStandings.scss";
import { data } from "react-router-dom";
import axios from "axios";
import UserResults from "../../components/UserResults/UserResults";

export default function LeagueStandings() {
  const [leagues, setLeagues] = useState("");
  const [error, setError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [predictionResults, setPredictionResults] = useState(null);
  const [leagueUsers, setLeagueUsers] = useState([]);

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
      setError("You must be logged in to view leagues");
    }
  };

  const handleSelectedLeague = async (e) => {
    setSelectedLeague(e.target.value);
    fetchPredictions(e.target.value);
    fetchLeagueUsers(e.target.value);
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
      console.log(data);
      setLeagueUsers(data);
    } catch (error) {
      setError("No users for selected league found");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  console.log(predictionResults);
  console.log(leagues);

  if (!leagues) {
    return <p>loading...</p>;
  }

  return (
    <div className="league__standings">
      <h1 className="title">League Standings</h1>
      <select onChange={handleSelectedLeague} name="selected_league">
        {leagues.map((league) => {
          <option value="">Select League</option>;
          return (
            <option key={league.league_id} value={league.league_id}>
              {league.name}
            </option>
          );
        })}
      </select>
      <section>
        <p className="gameweek__title">Gameweek</p>
        <section className="gameweek__scroll-wrapper">
          {predictionResults && (
            <>
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
          )}
          {leagueUsers.map((user, index) => {
            return (
              <UserResults
                user={user}
                key={index}
                selectedLeague={selectedLeague}
              />
            );
          })}
        </section>
      </section>
    </div>
  );
}
