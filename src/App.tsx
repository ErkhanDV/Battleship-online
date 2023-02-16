import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {
  Header,
  Footer,
  Background,
  Settings,
  Modal,
} from '@/components/_index';
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
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      check();
    } else {
      if (location.pathname !== '/') navigate('/');
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
      <Modal />
      <Background />
    </div>
  );
};

export default App;
