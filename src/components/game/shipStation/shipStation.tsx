import { type FC } from 'react';
import { useAppSelector, useShipLocationActions } from '@/hook/_index';
import { Ship } from '../_index';
import { setRandomShips } from '@/lib/utils/setRandomShips';

import './ShipStation.scss';

const ShipStation: FC<{ ships: number[] }> = ({ ships }) => {
  const { shipsLocation } = useAppSelector(
    (state) => state.shipsLocationSlice.user,
  );
  const { addShip, resetShips } = useShipLocationActions();
  const { isReady } = useAppSelector((state) => state.socketSlice);
  const { isStartSingle } = useAppSelector((state) => state.gameStateSlice);

  const resetShipsHandler = () => resetShips();
  const currentUser = 'user';

  if (!isReady) {
    return (
      // <div className="ship-station">
      //   {ships.map((decks, i) => (
      //     <Ship decks={decks} key={i} />
      //   ))}
      //   <button
      //     className="ship-station_button"
      //     onClick={() =>
      //       setRandomShips(shipsLocation, ships, currentUser, addShip)
      //     }
      //     disabled={!!isStartSingle}
      //   >
      //     Random
      //   </button>
      // <button
      //   className="ship-station_button"
      //   onClick={resetShipsHandler}
      //   disabled={!!isStartSingle}
      // >
      //   Reset ships
      // </button>
      // </div>
      <div className="ship-station">
        <div className="ship-station_container">
          {ships.map((decks, i) => (
            <Ship decks={decks} key={i} />
          ))}
        </div>
        <div className="ship-station_discription">
          <button
            className="ship-station_button"
            onClick={() =>
              setRandomShips(shipsLocation, ships, currentUser, addShip)
            }
          >
            Random
          </button>
          <button
            className="ship-station_button"
            onClick={resetShipsHandler}
            disabled={!!isStartSingle}
          >
            Reset ships
          </button>
          <p>
            Drag and drop your ships on the field
            <br /> or press the button for a random arrangement
          </p>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default ShipStation;
