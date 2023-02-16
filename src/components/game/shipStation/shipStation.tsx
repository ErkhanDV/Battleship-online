import { type FC } from 'react';
import { useAppSelector, useShipLocationActions } from '@/hook/_index';
import { Ship } from '../_index';
import { getCorrectShip } from '@/lib/API/ShipsPlacer/ShipsPlacer';
import { IShip } from '@/store/reducers/types/shipLocation';

const ShipStation: FC<{ ships: number[] }> = ({ ships }) => {
  const { shipsLocation } = useAppSelector(
    (state) => state.shipsLocationSlice.user,
  );
  const { addShip } = useShipLocationActions();
  const { isReady } = useAppSelector((state) => state.socketSlice);

  const getRandomShipSet = () => {
    const settedShips = [...shipsLocation];
    const newShips: IShip[] = [];
    ships.forEach((ship) => {
      getCorrectShip(settedShips, newShips, ship);
    });
    newShips.forEach((ship) => addShip(ship));
  };

  if (!isReady) {
    return (
      <div className="ship-station">
        {ships.map((decks, i) => (
          <Ship decks={decks} key={i} />
        ))}
        <button onClick={getRandomShipSet}>Random</button>
      </div>
    );
  }

  return <div></div>;
};

export default ShipStation;
