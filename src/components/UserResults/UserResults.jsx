import "./UserResults.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

export default function UserResults({ user, predictionResults }) {
  const [teamsData, setTeamsData] = useState(null);
  const [error, setError] = useState("");

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
    getTeams();
  }, []);

  if (!predictionResults || !teamsData) {
    return <BounceLoader />;
  }

  const userPredictions = predictionResults.filter(
    (userResults) => user.user_id === userResults.user_id
  );

  const predictionTeams = userPredictions.map((prediction) => {
    const foundTeam = teamsData.find((team) => team.id === prediction.team_id);
    return { ...prediction, team: foundTeam };
  });

  const gameWeeks = [
    ...new Set(predictionResults.map((prediction) => prediction.game_week)),
  ];

  const generateBadgeClass = (team) => {
    if (team.did_win === 0) {
      return "gameweek__badge gameweek__badge--eliminated";
    } else if (team.did_win === 1) {
      return "gameweek__badge gameweek__badge--won";
    } else {
      return "gameweek__badge";
    }
  };

  return (
    <ul className="gameweek__ul">
      <li className="gameweek__user">{user.name}</li>
      {gameWeeks.map((week) => {
        const team = predictionTeams.find(
          (prediction) => prediction.game_week === week
        );

        return (
          <div className="gameweek__badge-wrapper" key={week}>
            {team && team.team ? (
              <img
                className={generateBadgeClass(team)}
                src={`/images/${team.team.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}.svg`}
                alt={`${team.team.name} badge`}
              />
            ) : team && team.did_win === 0 ? (
              <img
                className="eliminated"
                src={"./src/assets/icons/eliminated.svg"}
                alt="Eliminated"
              />
            ) : (
              <div className="gameweek__empty-placeholder">?</div>
            )}
          </div>
        );
      })}
    </ul>
  );
}
