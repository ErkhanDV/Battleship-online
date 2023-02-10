import './Play.scss';

import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';
import { useAppSelector } from '@/store/hook/hook';

const Play = () => {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const settedShips = useAppSelector((state) => state.ships.shipsLocation);

  const renderRivalField = () => {
    if (settedShips.length === 10) {
      return (
        <>
          <Battleground isRival={true} />
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
      <Battleground />
      <div className="ship-station">
        {ships.map((decks) => (
          <Ship decks={decks} />
        ))}
      </div>
      {renderRivalField()}
    </main>
  );
};

export default Play;
