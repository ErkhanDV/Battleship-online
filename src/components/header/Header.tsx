import Settings from '@/components/settings/Settings';

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';

import { IHeader } from '@/types/Types';
import LoGInPage from '@/pages/login/LogIn';

const Header = ({ setModalOpen, setModalChildren }: IHeader) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handlerOpenModal = (component: JSX.Element) => {
    setModalOpen(true);
    setModalChildren(component);
    setMenuVisible(false);
  };

  return (
    <header className="header">
      <Link to="/" className="header_link">
        <h1 className="header_logo">
          Battle<span className="logo-image">Ship</span>
        </h1>
      </Link>
      <nav className={`header_navigation ${menuVisible && 'visible'}`}>
        <ul className="navigation_list" onClick={() => setMenuVisible(false)}>
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
          <li
            className="navigation_item"
            onClick={() => handlerOpenModal(<Settings />)}
          >
            Settings
          </li>
          <li
            className="navigation_item"
            onClick={() => handlerOpenModal(<LoGInPage />)}
          >
            Login
          </li>
        </ul>
      </nav>
      <div
        className={`header_burger ${menuVisible && 'open'}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <span className={`burger-icon ${menuVisible && 'open'}`}></span>
      </div>
    </header>
  );
};

export default Header;
