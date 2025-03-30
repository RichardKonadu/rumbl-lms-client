import axios from "axios";
import { useEffect, useState } from "react";

export default function Leagues() {
  const authToken = localStorage.getItem("authToken");
  const [predictionResults, SetPredictionResults] = useState("");
  const [error, setError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(2);
  const [leagues, setLeagues] = useState(null);

  const fetchLeagues = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/leagues`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setLeagues(data);
    } catch (error) {
      setError("You must be logged in to view results");
    }
  };

  const handleLeagueSelection = (e) => {
    setSelectedLeague(e.target.value);
  };

  const handleJoinLeague = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/leagues/join/${selectedLeague}`,
        {},
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      setError("Failed to join league");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  if (!leagues) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h2>Join a League</h2>
      <select name="league_id" onChange={handleLeagueSelection}>
        {leagues.map((league, index) => {
          return (
            <option key={index} value={league.id}>
              {league.name}
            </option>
          );
        })}
      </select>
      <button onClick={handleJoinLeague}>Submit</button>
    </>
  );
}
