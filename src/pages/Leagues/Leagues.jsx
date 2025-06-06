import axios from "axios";
import { useEffect, useState } from "react";
import "./Leagues.scss";
import CancelButton from "../../components/CancelButton/CancelButton";
import { Link, useNavigate } from "react-router-dom";

export default function Leagues() {
  const authToken = localStorage.getItem("authToken");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState("");
  const [leagues, setLeagues] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createLeagueFormVisibility, setCreateLeagueFormVisibility] =
    useState(false);
  const [success, setSuccess] = useState(false);

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
      setSuccess("Sucessfully joined league, redirecting to predictions");
      setTimeout(() => {
        navigate("/predictions");
      }, 2000);
    } catch (error) {
      setError("Failed to join league");
    }
  };

  const handleCreateLeagueVisbility = async (visbility) => {
    if (visbility === "open") {
      setCreateLeagueFormVisibility(true);
    } else setCreateLeagueFormVisibility(false);
    setDropdownVisible(false);
  };

  const handleFormData = async (e) => {
    const authToken = localStorage.getItem("authToken");
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

  if (!authToken) {
    return (
      <div className="error__wrapper">
        <p className="error">
          You must be logged in to create and join leagues
        </p>
        <Link className="error__cta" to="/signup">
          Signup
        </Link>
        <Link className="error__cta" to="/login">
          Login
        </Link>
      </div>
    );
  }

  if (!leagues) {
    return <p>loading...</p>;
  }

  return (
    <div className="leagues">
      <h1 className="leagues__title">Leagues</h1>
      <div className="button__wrapper">
        {!createLeagueFormVisibility && !dropdownVisible && (
          <button
            onClick={() => handleDropdownVisibility("open")}
            className="button"
          >
            Join a league
          </button>
        )}

        {dropdownVisible && !selectedLeague && (
          <>
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
            <CancelButton
              handleCreateLeagueVisbility={handleCreateLeagueVisbility}
            />
          </>
        )}
        {!dropdownVisible && !createLeagueFormVisibility && (
          <button
            onClick={() => handleCreateLeagueVisbility("open")}
            className="button"
          >
            Create a league
          </button>
        )}
        {selectedLeague && dropdownVisible && (
          <>
            <p>Confirm joining league</p>{" "}
            <button onClick={handleJoinLeague} className="button">
              Confirm
            </button>
            <CancelButton
              handleCreateLeagueVisbility={() => setSelectedLeague("")}
            />
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
          <CancelButton
            handleCreateLeagueVisbility={handleCreateLeagueVisbility}
          />
        </form>
      )}
      {success && <p>{success}</p>}
    </div>
  );
}
