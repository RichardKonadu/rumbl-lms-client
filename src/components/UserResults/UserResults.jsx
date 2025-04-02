import "./UserResults.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserResults({ selectedLeague, user }) {
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [teamsData, setTeamsData] = useState(null);

  const getPredictions = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/predictions/results?leagueId=${selectedLeague}`
      );
      setResults(data);
    } catch (error) {
      setError("No predictions found");
    }
  };

  const getTeams = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/teams`
      );
      setTeamsData(data);
    } catch (error) {
      setError("No teams found");
    }
  };

  useEffect(() => {
    getPredictions();
    getTeams();
  }, []);

  if (!results || !teamsData) {
    return <p>Loading.....</p>;
  }

  const userPredictions = results.filter(
    (userResults) => user.user_id === userResults.user_id
  );

  const predictionTeams = userPredictions.map((prediction) => {
    const foundTeam = teamsData.find((team) => team.id === prediction.team_id);
    return { ...prediction, team: foundTeam };
  });

  return (
    <ul className="gameweek__ul">
      <li className="gameweek__user">{user.name}</li>
      {predictionTeams.map((team) => {
        return (
          <div className="gameweek__badge-wrapper" key={team.id}>
            <img
              className={`gameweek__badge ${
                team.did_win === 0 ? "gameweek__badge--active" : ""
              }`}
              src={`/src/assets/images/${team.team.name.replace(
                /\s+/g,
                "-"
              )}.svg`}
              alt={`${team.team.name} badge`}
            />
          </div>
        );
      })}
    </ul>
  );
}
