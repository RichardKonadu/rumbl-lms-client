import "../Fixtures/Fixtures.scss";

export default function Fixtures({ fixture }) {
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
        />{" "}
        {fixture.home_team_abbr} vs {fixture.away_team_abbr}{" "}
        <img
          className="badge"
          src={`/src/assets/images/${fixture.away_team_name.replace(
            /\s+/g,
            "-"
          )}.svg`}
          alt={`${fixture.away_team_name} badge`}
        />
      </li>
    </>
  );
}
