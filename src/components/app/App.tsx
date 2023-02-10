import { useEffect, useState, type FC } from 'react';
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
  const [isChecking, setIsChecking] = useState(false);

  const check = async () => {
    setIsChecking(true);
    const isAuth = await AuthService.checkAuth();
    setIsChecking(false);

    if (!isAuth) {
      if (location.pathname !== '/') {
        navigate('/');
      }
    } else {
      if (location.pathname === '/') {
        navigate(`${location.pathname}`);
      }
    }
  };

  // useEffect(() => {
  //   console.log(true);
  //   if (!isChecking) {
  //     if (localStorage.getItem('token')) {
  //       check();
  //     } else {
  //       if (location.pathname !== '/') navigate('/');
  //     }
  //   }
  // }, []);

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
