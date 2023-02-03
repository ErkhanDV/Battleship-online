import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header_logo">
        Battle<span className="logo-image">Ship</span>
      </h1>
      <nav className="header_navigation">
        <ul className="navigation_list">
          <li className="navigation_item">
            <Link to="/" className="navigation_link">
              Home
            </Link>
          </li>
          <li className="navigation_item">
            <Link to="/play" className="navigation_link">
              Play
            </Link>
          </li>
          <li className="navigation_item">
            <Link to="/rules" className="navigation_link">
              Rules
            </Link>
          </li>
          <li className="navigation_item">
            <Link to="/settings" className="navigation_link">
              Settings
            </Link>
          </li>
          <li className="navigation_item">Log in</li>
          <li className="navigation_item">Sign up</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
