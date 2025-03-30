import "../TeamButton/TeamButton.scss";

export default function TeamButton({ prediction, teamsData }) {
  const team = teamsData.find((team) => team.id === prediction.team_id);
  return <li className="team__button">{team.name}</li>;
}
