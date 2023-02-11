import Header from '../header/Header';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import Background from '../background/Background';
import { useEffect, useState, type FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import { AuthService } from '@/services/axios/Auth';
import { Socket } from '@/services/Socket';
import { gameService } from '@/services/axios/Game';

import AppRouter from '../router/AppRouter';
import { useState } from 'react';
import Settings from '@/components/settings/Settings';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<Settings />);
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
      <Header setModalOpen={setModalOpen} setModalChildren={setModalChildren} />
      <AppRouter />
      <Footer />
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        children={modalChildren}
      />
      <Background />
    </div>
  );
};

export default App;
