import { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useLogInActions,
  useAppSelector,
  useGameStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import { authService, gameService } from '@/services/axios/_index';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { ROUTE } from '@/router/_constants';
import './Header.scss';

const Header: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const navigate = useNavigate();
  const { setModalOpen, setUser, setModalChildren } = useLogInActions();
  const { setUserName } = useGameStateActions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [gameTryConnect, setGameTryConnect] = useState(false);
  const [logStatus, setlogStatus] = useState('LogIn');

  const { user, isAuthorized } = useAppSelector((state) => state.logInSlice);

  const { t } = useTranslation();

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
      if (sendSocket) sendSocket(SOCKETMETHOD.exit);
      setUser('');
    } else {
      modalHandler('log');
    }
  };

  const gameHandler = async () => {
    if (isAuthorized) {
      const response = await gameService.startGame();

      if (response) {
        setUserName(response.user.name);
        if (sendSocket) {
          sendSocket(SOCKETMETHOD.connect, response);
        }
      }

      if (location.pathname !== ROUTE.game) {
        navigate(ROUTE.game);
      }
    } else {
      setGameTryConnect(true);
      modalHandler('log');
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header_link">
        <h1 className="header_logo">
          {t('battle')}
          <span className="logo-image">{t('ship')}</span>
        </h1>
      </Link>
      <nav className={`header_navigation ${menuVisible && 'visible'}`}>
        <ul className="navigation_list" onClick={() => setMenuVisible(false)}>
          <li className="navigation_item">
            <NavLink to="/" className="navigation_link">
              {t('home')}
            </NavLink>
          </li>
          <li className="navigation_item">
            <div onClick={gameHandler} className="navigation_link">
              {t('game')}
            </div>
          </li>
          <li className="navigation_item">
            <NavLink to="/singleplayer" className="navigation_link">
              {t('single')}
            </NavLink>
          </li>
          <li className="navigation_item">
            <NavLink to="/rules" className="navigation_link">
              {t('rules')}
            </NavLink>
          </li>
          <li
            className="navigation_item"
            onClick={() => modalHandler('settings')}
          >
            {t('settings')}
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
