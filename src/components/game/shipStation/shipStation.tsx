import { type FC } from 'react';
import { useAppSelector, useShipLocationActions } from '@/hook/_index';
import { Ship } from '../_index';
import { setRandomShips } from '@/lib/utils/setRandomShips';

const ShipStation: FC<{ ships: number[] }> = ({ ships }) => {
  const { shipsLocation } = useAppSelector(
    (state) => state.shipsLocationSlice.user,
  );
  const { addShip, resetShips } = useShipLocationActions();
  const { isReady } = useAppSelector((state) => state.socketSlice);

  const resetShipsHandler = () => resetShips();
  const currentUser = 'user';

  if (!isReady) {
    return (
      <div className="ship-station">
        {ships.map((decks, i) => (
          <Ship decks={decks} key={i} />
        ))}
        <button
          onClick={() =>
            setRandomShips(shipsLocation, ships, currentUser, addShip)
          }
        >
          Random
        </button>
        <button onClick={resetShipsHandler}>Reset ships</button>
      </div>
    );
  }

  return <div></div>;
};

export default ShipStation;
