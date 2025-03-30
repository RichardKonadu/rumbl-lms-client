import { NavLink } from "react-router-dom";
import "../Header/Header.scss";
import { push as Menu } from "react-burger-menu";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <h1 className="header__title">Rumbl.</h1>
      <Menu
        noOverlay
        right
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      >
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <NavLink className="nav__link" to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav__link" to="/signup" onClick={closeMenu}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink className="nav__link" to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav__link" to="/profile" onClick={closeMenu}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav__link"
                to="/predictions"
                onClick={closeMenu}
              >
                Predictions
              </NavLink>
            </li>
            <li>
              <NavLink className="nav__link" to="/leagues" onClick={closeMenu}>
                Leagues
              </NavLink>
            </li>
          </ul>
        </nav>
      </Menu>
    </header>
  );
}
