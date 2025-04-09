import "../Homepage/Homepage.scss";
import homepageimage from "../../../public/images/Calafiori.jpg";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__content">
        <Link to="/how-to-play" className="homepage__button">
          How to play
        </Link>
        <Link
          to="/signup"
          className="homepage__button homepage__button--signup"
        >
          Sign Up
        </Link>
      </div>
      <div className="homepage__description">
        <h3 className="homepage__description-title">What is Rumbl?</h3>
        <p className="homepage__description-copy">
          Rumbl is a sports prediction game inspired by last man standing. The
          concept is simple, you predict one team to win each gameweek and
          compete in leagues with your friends to win. The catch, you can't pick
          the same team twice. Make a wrong pick, and you're out! The last
          person standing is the winner.
        </p>
        <p className="homepage__description-copy">
          Currently, you can predict Premier League games, with NBA predictions
          coming soon!
        </p>
      </div>
      <img className="homepage__image" src={homepageimage} alt="" />
    </div>
  );
}
