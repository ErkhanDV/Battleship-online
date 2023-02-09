import { useEffect, type FC } from 'react';
import { Socket } from '@/services/Socket';
import { gameService } from '@/services/axios/Game';

const Game: FC = () => {
  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();
      if (response) {
        console.log('socket');
        const socket = new Socket(response);
      }
    })();
  });

  return (
    <div>
      <button>play</button>
    </div>
  );
};

export default Game;



