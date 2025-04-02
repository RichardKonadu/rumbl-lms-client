import axios from "axios";
import { useEffect, useState } from "react";
import "./Leagues.scss";

export default function Leagues() {
  const authToken = localStorage.getItem("authToken");
  const [error, setError] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leagues, setLeagues] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createLeagueFormVisibility, setCreateLeagueFormVisibility] =
    useState(false);
  const [formData, setFormData] = useState("");

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
      setError("You must be logged in to view leagues");
    }
  };

  const handleDropdownVisibility = (visbility) => {
    if (visbility === "open") {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      setSelectedLeague("");
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

  const handleCreateLeagueVisbility = async (visbility) => {
    if (visbility === "open") {
      setCreateLeagueFormVisibility(true);
    } else setCreateLeagueFormVisibility(false);
  };

  const handleFormData = async (e) => {
    const authToken = localStorage.getItem("authToken");
    console.log(e);
    console.log(e.target);

    console.log(e.target.sport);
    console.log(e.target.sport.value);

    console.log(e.target.league_name.value);

    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/leagues`,
        { name: e.target.league_name.value, sport: e.target.sport.value },
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      fetchLeagues();
    } catch (error) {
      setError("Failed to create League");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  if (!leagues) {
    return <p>loading...</p>;
  }

  return (
    <div className="leagues">
      <h1 className="leagues__title">Leagues</h1>
      <div className="button__wrapper">
        {!createLeagueFormVisibility && (
          <button
            onClick={() => handleDropdownVisibility("open")}
            className="button"
          >
            Join a league
          </button>
        )}

        {dropdownVisible && (
          <select
            className="dropdown"
            name="league_id"
            onChange={handleLeagueSelection}
          >
            <option>Select League</option>
            {leagues.map((league, index) => {
              return (
                <option key={index} value={league.id} name={league.name}>
                  {league.name}
                </option>
              );
            })}
          </select>
        )}
        {!dropdownVisible && !createLeagueFormVisibility && (
          <button
            onClick={() => handleCreateLeagueVisbility("open")}
            className="button"
          >
            Create a league
          </button>
        )}
        {selectedLeague && (
          <>
            <p>Confirm joining league</p>{" "}
            <button onClick={handleJoinLeague} className="button">
              Confirm league registration
            </button>
            <button
              onClick={() => handleDropdownVisibility("closed")}
              className="button button--cancel"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {createLeagueFormVisibility && (
        <form className="create-league" onSubmit={handleFormData}>
          <label htmlFor="">League name</label>
          <input
            className="form__input"
            type="text"
            placeholder="e.g. my cool league"
            name="league_name"
          />
          <select className="create-league__dropdown" name="sport">
            <option value="">Select Sport</option>
            <option value="Premier League">English Premier League</option>
            <option value="NBA">NBA</option>
          </select>
          <button className="button" type="submit">
            Confirm league registration
          </button>
          <button
            className="button button--cancel"
            onClick={() => handleCreateLeagueVisbility("closed")}
            type="button"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
