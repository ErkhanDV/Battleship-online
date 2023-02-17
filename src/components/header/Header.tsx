import { useState, useEffect, FC } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthService } from '@/services/axios/Auth';
import './Header.scss';
import { useLogInActions, useAppSelector } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';

const Header: FC = () => {
  const navigate = useNavigate();
  const { setModalOpen, setUser, setModalChildren } = useLogInActions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [gameTryConnect, setGameTryConnect] = useState(false);
  const [logStatus, setlogStatus] = useState('LogIn');

  const { user, isAuthorized } = useAppSelector((state) => state.logInSlice);

  useEffect(() => {
    setlogStatus(isAuthorized ? `${user}: logout` : 'Login');

    if (isAuthorized && gameTryConnect) {
      setGameTryConnect(false);
      navigate(ROUTE.game);
    }
  }, [isAuthorized]);

  const modalHandler = (component: string) => {
    setModalOpen(true);
    setModalChildren(component);
    setMenuVisible(false);
  };

  const logHandler = async () => {
    if (isAuthorized) {
      await AuthService.logout();
      navigate(ROUTE.home);
      setUser('');
    } else {
      modalHandler('log');
    }
  };

  const gameHandler = () => {
    if (isAuthorized) {
      if (location.pathname !== ROUTE.game) navigate(ROUTE.game);
    } else {
      setGameTryConnect(true);
      setModalOpen(true);
    }
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
            <div onClick={gameHandler} className="navigation_link">
              Play
            </div>
          </li>
          <li className="navigation_item">
            <NavLink to="/rules" className="navigation_link">
              Rules
            </NavLink>
          </li>
          <li
            className="navigation_item"
            onClick={() => modalHandler('settings')}
          >
            Settings
          </li>
          <li className="navigation_item" onClick={() => logHandler()}>
            {logStatus}
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
