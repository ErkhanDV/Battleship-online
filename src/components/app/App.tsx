import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthService } from '@/services/axios/Auth';
import LogIn from '@/pages/login/LogIn';
import Home from '../../pages/home/Home';
import Game from '@/pages/game/Game';
import './App.scss';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      if (localStorage.getItem('token')) {
        const check = async () => {
          const isAuth = await AuthService.checkAuth();

          navigate(isAuth ? '/home' : '/');
        };

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
