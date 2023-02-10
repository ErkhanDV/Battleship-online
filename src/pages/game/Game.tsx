import { useEffect, type FC } from 'react';
import { useSocket } from '@/hook/use-socket';
import { gameService } from '@/services/axios/Game';
import { IStartGame, ISocketMessage } from '@/services/axios/_types';

const Game: FC = () => {
  const { init } = useSocket();

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) init(response);
    })();
  }, []);

  return (
    <div>
      <button>play</button>
    </div>
  );
};

export default Game;
