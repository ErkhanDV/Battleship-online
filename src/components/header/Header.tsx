import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header_logo">
        Battle<span className="logo-image">Ship</span>
      </h1>
      <nav className="header_navigation">
        <ul className="navigation_list">
          <li className="navigation_item">
            <NavLink to="/" className="navigation_link">
              Home
            </NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="/play" className="navigation_link">
              Play
            </NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="/rules" className="navigation_link">
              Rules
            </NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="/settings" className="navigation_link">
              Settings
            </NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="/login" className="navigation_link">
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
