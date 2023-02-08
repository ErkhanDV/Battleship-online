import route from 'react-router-dom';
import { FC } from 'react';
import { Socket } from '@/services/Socket';
import { gameService } from '@/services/axios/Game';

const Game: FC = () => {
  const getId = async () => {
    const response = await gameService.startGame();

    if (response) {
      const socket = new Socket(response);
    }
  };

  getId();

  // const sendHandler = () => {
  //   socket.instance.send(
  //     JSON.stringify({
  //       id: id,
  //     }),
  //   );
  // };

  return (
    <div>
      <button></button>
    </div>
  );
};

export default Game;
