import axios from "axios";
import { useEffect, useState } from "react";
import Fixtures from "../../components/Fixtures/Fixtures";
import "../Predictions/Predictions.scss";

export default function Predictions() {
  const [teamsData, setTeamsData] = useState("");
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState("");

  const fetchFixtures = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/fixtures`
      );
      setFixtures(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  if (!fixtures) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="fixtures__wrapper">
      <h2 className="fixtures__title">Fixtures</h2>
      <ul className="fixture__list">
        {fixtures.map((fixture, index) => {
          return <Fixtures key={index} fixture={fixture} />;
        })}
      </ul>
    </div>
  );
}
