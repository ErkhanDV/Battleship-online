import { useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Background from './components/background/Background';
import { AuthService } from '@/services/axios/Auth';

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const check = async () => {
    const isAuth = await AuthService.checkAuth();

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
      <AppRouter />
      <Background />
    </div>
  );
};

export default App;
