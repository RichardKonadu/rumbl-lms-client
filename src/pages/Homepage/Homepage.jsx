import "../Homepage/Homepage.scss";
import homepageimage from "../../assets/images/Calafiori.jpg";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__content">
        <button className="homepage__button">How to play</button>
        <button className="homepage__button">Sign Up</button>
      </div>
      <div className="homepage__description">
        <h3 className="homepage__description-title">What is Rumbl?</h3>
        <p className="homepage__description-copy">
          Rumbl is a sports prediction game inspired by last man standing. The
          concept is simple, you predict one team to win each gameweek and
          compete in leagues with your friends to win. The catch, you can't pick
          the same team twice.
        </p>
        <p className="homepage__description-copy">
          Make a wrong pick, and you're out! The last person standing is the
          winner.
        </p>
      </div>
      <img className="homepage__image" src={homepageimage} alt="" />
    </div>
  );
}
