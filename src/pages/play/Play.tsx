import './Play.scss';

import Battleground from './components/battleground/Battleground';
import Ship from './components/ship/ship';
import { useAppDispatch, useAppSelector } from '@/store/hook/hook';
import { setWoundedCell } from '@/store/reducers/ShipsLocationSlice';
import { addRivalHit, addRivalMiss } from '@/store/reducers/ShootsSlice';

const Play = () => {
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const settedShips = useAppSelector(
    (state) => state.shipsLocation.shipsLocation,
  );
  const dispatch = useAppDispatch();

  const renderRivalField = () => {
    if (settedShips.length === 10) {
      return (
        <>
          <Battleground isRival={true} />
          <button
            onClick={() => {
              const random = Math.floor(Math.random() * 100);
              const shootTarget = settedShips.findIndex((ship) =>
                ship.shipLocation.some((coordinate) => random === coordinate),
              );
              if (shootTarget !== -1) {
                dispatch(addRivalHit(random));
                console.log(`U r shoot me at coordinate: ${random}`);
                dispatch(
                  setWoundedCell({ index: shootTarget, cellId: random }),
                );
              } else {
                dispatch(addRivalMiss(random));
                console.log(`U r miss :( at coordinate: ${random}`);
              }
              console.log(shootTarget, random);
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
        {ships.map((decks, index) => (
          <Ship decks={decks} key={index} />
        ))}
      </div>
      {renderRivalField()}
    </main>
  );
};

export default Play;
