import { useEffect, type FC } from 'react';
import { useSocket } from '@/hook/use-socket';
import { gameService } from '@/services/axios/Game';
import Field from './components/battleground/Field';
import Ship from './components/ship/ship';
import { useAppSelector } from '@/store/hook/hook';
import './game.scss';

const Game: FC = () => {
  const { init } = useSocket();

  useEffect(() => {
    (async () => {
      const response = await gameService.startGame();

      if (response) init(response);
    })();
  }, []);

  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const settedShips = useAppSelector((state) => state.shipsSlice.shipsLocation);

  const renderRivalField = () => {
    if (settedShips.length === 10) {
      return (
        <>
          <Field isRival={true} />
          <button
            onClick={() => {
              const random = Math.floor(Math.random() * 100);
              const isShoot = settedShips.some((ship) => {
                return ship.find((coordinate) => coordinate === random);
              });
              if (!!isShoot) {
                console.log(`U r shoot me at coordinate: ${random}`);
              } else {
                console.log(`U r miss :( at coordinate: ${random}`);
              }
            }}
          >
            Click me to shoot
          </button>
        </>
      );
    }
  };

  return (
    <main className="main">
      <Field />
      <div className="ship-station">
        {ships.map((decks, i) => (
          <Ship decks={decks} key={i} />
        ))}
      </div>
      {renderRivalField()}
    </main>
  );
};

export default Game;
