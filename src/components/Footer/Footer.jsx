import { NavLink } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <h3 className="footer__title">Rumbl.</h3>
        <ul className="footer__nav">
          <li>
            <NavLink to="/how-to-play" className="nav__link">
              How to play
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/leagues" className="nav__link">
              Leagues
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/predictions" className="nav__link">
              Predictions
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/profile" className="nav__link">
              My Account
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
