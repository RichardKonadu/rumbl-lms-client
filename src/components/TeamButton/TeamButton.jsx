import "../TeamButton/TeamButton.scss";

export default function TeamButton({ team, handlePredictedTeam }) {
  return (
    <li
      onClick={() => {
        handlePredictedTeam(team);
      }}
      className="team__button"
    >
      {team.abbr}
    </li>
  );
}
