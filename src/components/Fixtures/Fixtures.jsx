import { isFuture, isPast } from "date-fns";
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
          src={`/images/${fixture.home_team_name
            .replace(/\s+/g, "-")
            .toLowerCase()}.svg`}
          alt={`${fixture.home_team_name} badge`}
          onClick={() => handleBadgeClick(homeTeam)}
        />{" "}
        {isPast(fixture.kickoff) && (
          <>
            <div className="score__wrapper">
              <p>{fixture.home_team_abbr}</p>
              <p>{fixture.home_score ? fixture.home_score : "0"}</p>
            </div>
            <div className="score__wrapper">
              <p>{fixture.away_score ? fixture.away_score : "0"}</p>
              <p>{fixture.away_team_abbr}</p>
            </div>
          </>
        )}
        {isFuture(fixture.kickoff) && (
          <p>
            {fixture.home_team_abbr} vs {fixture.away_team_abbr}
          </p>
        )}
        <img
          className="badge"
          src={`/images/${fixture.away_team_name
            .replace(/\s+/g, "-")
            .toLowerCase()}.svg`}
          alt={`${fixture.away_team_name} badge`}
          onClick={() => handleBadgeClick(awayTeam)}
        />
      </li>
    </>
  );
}
