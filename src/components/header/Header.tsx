import { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { SocketContext } from '@/Context';
import { useLogInActions, useAppSelector } from '@/hook/_index';
import { authService, gameService } from '@/services/axios/_index';
import { ROUTE } from '@/router/_constants';
import './Header.scss';

const Header: FC = () => {
  const { socket, setSocket, init } = useContext(SocketContext);
  const navigate = useNavigate();
  const { setModalOpen, setUser, setModalChildren } = useLogInActions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [gameTryConnect, setGameTryConnect] = useState(false);
  const [logStatus, setlogStatus] = useState('LogIn');

  const { user, isAuthorized } = useAppSelector((state) => state.logInSlice);

  useEffect(() => {
    setlogStatus(isAuthorized ? `${user}: logout` : 'Login');

    (async () => {
      if (isAuthorized && gameTryConnect) {
        setGameTryConnect(false);
        gameHandler();
      }
    })();
  }, [isAuthorized]);

  const modalHandler = (component: string) => {
    setModalOpen(true);
    setModalChildren(component);
    setMenuVisible(false);
  };

  const logHandler = async () => {
    if (isAuthorized) {
      await authService.logout();
      socket?.close();
      setSocket(null);
      navigate(ROUTE.home);
      setUser('');
    } else {
      modalHandler('log');
    }
  };

  const gameHandler = async () => {
    const response = await gameService.startGame();
    if (response) {
      if (location.pathname !== ROUTE.game) navigate(ROUTE.game);
      init(response);
    } else {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
      setGameTryConnect(true);
      modalHandler('log');
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
              Game
            </div>
          </li>
          <li className="navigation_item">
            <NavLink to="/singleplayer" className="navigation_link">
              Single Player
            </NavLink>
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
