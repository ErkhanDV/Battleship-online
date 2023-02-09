import { useEffect, type FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LogIn from '@/pages/login/LogIn';
import Home from '../../pages/home/Home';
import Game from '@/pages/game/Game';
import { AuthService } from '@/services/axios/Auth';
import './App.scss';
import { Socket } from '@/services/Socket';
import { gameService } from '@/services/axios/Game';

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const check = async () => {
    const isAuth = await AuthService.checkAuth();

    if (!isAuth) navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      check();
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      if (localStorage.getItem('token')) {
        check();
      } else {
        navigate('/');
      }
    }
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
