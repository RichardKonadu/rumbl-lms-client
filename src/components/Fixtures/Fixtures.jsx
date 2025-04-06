import "../Fixtures/Fixtures.scss";

export default function Fixtures({
  fixture,
  setPredictedTeam,
  setIsModalOpen,
  previousPredictions,
  setPreviouslyPredicted,
}) {
  const handleBadgeClick = (team) => {
    setPredictedTeam({
      id: team.id,
      name: team.name,
      abbr: team.abbr,
    });

    const hasTeamBeenPicked = previousPredictions.some(
      (prediction) => prediction.team_id === team.id
    );

    if (hasTeamBeenPicked) {
      setPreviouslyPredicted(true);
    } else {
      setPreviouslyPredicted(false);
    }

    setIsModalOpen(true);
  };

  const homeTeam = {
    id: fixture.home_team_id,
    name: fixture.home_team_name,
    abbr: fixture.home_team_abbr,
  };

  const awayTeam = {
    id: fixture.away_team_id,
    name: fixture.away_team_name,
    abbr: fixture.away_team_abbr,
  };

  return (
    <>
      <li className="fixture">
        <img
          className="badge"
          src={`/src/assets/images/${fixture.home_team_name.replace(
            /\s+/g,
            "-"
          )}.svg`}
          alt={`${fixture.home_team_name} badge`}
          onClick={() => handleBadgeClick(homeTeam)}
        />{" "}
        {fixture.home_team_abbr} vs {fixture.away_team_abbr}{" "}
        <img
          className="badge"
          src={`/src/assets/images/${fixture.away_team_name.replace(
            /\s+/g,
            "-"
          )}.svg`}
          alt={`${fixture.away_team_name} badge`}
          onClick={() => handleBadgeClick(awayTeam)}
        />
      </li>
    </>
  );
}
