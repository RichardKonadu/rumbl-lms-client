import "./UserResults.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserResults({ selectedLeague, user }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [teamsData, setTeamsData] = useState([]);

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

  const userPredictions = results.filter(
    (userResults) => user.user_id === userResults.user_id
  );

  const foundTeam = teamsData.find(
    (team) => team.id === userPredictions.team_id
  );

  useEffect(() => {
    getPredictions();
    getTeams();
  }, []);

  if (!teamsData) {
    return;
  }

  return (
    <>
      <ul className="gameweek__ul">
        <li>{user.name}</li>
        {userPredictions.map((userPrediction) => {
          return <li>{userPrediction.team_id}</li>;
        })}
      </ul>
    </>
  );

  //   return (
  //     <ul>
  //       <li>{user.name}</li>
  //       {userPredictions.map((userPrediction) => {
  //         return (
  //           <>
  //             <li key={userPrediction.id}> {userPrediction.team_id}</li>
  //             <li> {userPrediction.game_week}</li>
  //             <li>
  //               {" "}
  //               {userPrediction.did_win === 1 ? (
  //                 <p>They won</p>
  //               ) : (
  //                 <p> They lost</p>
  //               )}
  //             </li>
  //           </>
  //         );
  //       })}
  //     </ul>
  //   );
}
