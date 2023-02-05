import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Background from '@/components/background/Background';
import './Home.scss';
import { gameService } from '@/services/axios/Game';

const Home: FC = () => {
  const navigate = useNavigate();

  const playHandler = async () => {
    const socket = await gameService.startGame();

    if (socket) {
      navigate('/game');

      socket.onopen = () => {
        console.log('Подключение установлено');
      };
    }
  };

  return (
    <main className="main">
      <Header />
      <button onClick={playHandler}>Play</button>
      <Footer />
      <Background />
    </main>
  );
};

export default Home;
