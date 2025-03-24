import { NavLink } from "react-router-dom";
import "../Header/Header.scss";

export default function Header() {
  return (
    <header>
      <h1>Rumbl</h1>
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink className="nav__link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to="/signup">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__link" to="/profile">
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
