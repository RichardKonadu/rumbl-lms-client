import { Link } from "react-router-dom";
import "./HowToPlay.scss";

export default function HowToPlay() {
  return (
    <div className="howtoplay">
      <h1 className="howtoplay__title">How to play</h1>
      <ul className="howtoplay__list">
        <li className="howtoplay__list-item">
          {" "}
          - Create an account to get started
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - Join a pre-existing league with friends to start predicting or
          create your own!
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - Head over to the predictions page to make weekly predictions on your
          chosen sport and league.
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - Remember to choose strategically as you can only select any given
          team one time.
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - Sit tight and wait for you team to (hopefully) win!
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - You can check previous predictions, and who's still in on the league
          standings page.
        </li>
        <li className="howtoplay__list-item">
          {" "}
          - N.B. You can play for fun but if you would like to have a prize,
          this must be managed by league members themselves.
        </li>
      </ul>
      <div className="get-started">
        <h3 className="get-started__title"> Get Started</h3>
        <Link className="get-started__cta" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
