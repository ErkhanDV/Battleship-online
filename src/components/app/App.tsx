<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import LogIn from '@/pages/login/LogIn';
import Header from '../header/Header';
import Home from '../../pages/home/Home';
import Footer from '../footer/Footer';
import Background from '../background/Background';

import './App.scss';
=======
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import Background from '../background/Background';

import './App.scss';

import AppRouter from '../router/AppRouter';
import { useState } from 'react';
import LoGInPage from '@/pages/login/LogIn';
import Settings from '@/components/settings/Settings';
>>>>>>> develop

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState(<Settings />);

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
