import { type FC } from 'react';
import { useAppSelector, useShipLocationActions } from '@/hook/_index';
import { Ship } from '../_index';
import { getCorrectShip } from '@/lib/API/ShipsPlacer/ShipsPlacer';
import { IShip } from '@/store/reducers/types/shipLocation';

import './ShipStation.scss';

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
        <div className="ship-station_container">
          {ships.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
        </div>
        <div className="ship-station_discription">
          <button className="ship-station_button" onClick={getRandomShipSet}>
            Random
          </button>
          <p>
          Drag and drop your ships on the field<br/> or press the button for a random arrangement
          </p>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default ShipStation;
