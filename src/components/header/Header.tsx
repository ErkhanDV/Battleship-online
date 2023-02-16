import { useState, useEffect, FC } from 'react';
import { Settings, LogIn } from '@/components/_index';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthService } from '@/services/axios/Auth';
import './Header.scss';
import { useLogInActions, useAppSelector } from '@/hook/_index';

const Header: FC = () => {
  const navigate = useNavigate();
  const { setModalOpen, setUser, setModalChildren } = useLogInActions();
  const [menuVisible, setMenuVisible] = useState(false);
  const [logStatus, setlogStatus] = useState('LogIn');

  const { user, isAuthorized } = useAppSelector((state) => state.logInSlice);

  useEffect(() => {
    setlogStatus(isAuthorized ? `${user}: logout` : 'Login');
  }, [isAuthorized]);

  const handlerOpenModal = (component: string) => {
    setModalOpen(true);
    setModalChildren(component);
    setMenuVisible(false);
  };

  const logHandler = async () => {
    if (isAuthorized) {
      await AuthService.logout();
      setUser('');
    } else {
      handlerOpenModal('log');
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
            <NavLink to="/game" className="navigation_link">
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
            onClick={() => handlerOpenModal('settings')}
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
