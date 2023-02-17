import { useGameStateActions } from '@/hook/use-game-state-actios';
import { useAppSelector } from '@/hook/use-redux';
import { useShipLocationActions } from '@/hook/use-shipLocation-actions';
import { getSettedShips } from '@/lib/utils/getSettedShips';
import { setRandomShips } from '@/lib/utils/setRandomShips';
import { Field, RivalField, ShipStation } from '../_index';
import { IGameField } from './_types';

const GameField = ({ isReady, socket, readyHandler }: IGameField) => {
  const { shipsLocation } = useAppSelector(
    (state) => state.shipsLocationSlice.user,
  );
  const ships = getSettedShips(shipsLocation);
  const { user } = useAppSelector((state) => state.shipsLocationSlice);
  const { singlePlayer, isStartSingle } = useAppSelector(
    (state) => state.gameStateSlice,
  );
  const { changeGameStatus } = useGameStateActions();
  const computerShipsLocation = useAppSelector(
    (state) => state.shipsLocationSlice.rival.shipsLocation,
  );
  const { addShip } = useShipLocationActions();
  const currentUser = 'rival';

  const readyButtonHandler = (readyHandler: (() => void) | undefined) => {
    if (!!singlePlayer) {
      changeGameStatus(true);
      setRandomShips(
        computerShipsLocation,
        [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
        currentUser,
        addShip,
      );
    }
    return readyHandler;
  };

  const renderButton = () => {
    if ((!isReady && !singlePlayer) || !isStartSingle) {
      return (
        <button
          disabled={user.shipsLocation.length < 10}
          onClick={() => readyButtonHandler(readyHandler)}
          className="ready"
        >
          {!!singlePlayer ? 'Start game' : 'Ready'}
        </button>
      );
    }
  };

  return (
    <div className="game">
      <main className="game-wrapper">
        {renderButton()}
        <div className="fields">
          <div className="user">
            <div className="name">You</div>
            <Field isRival={false} />
          </div>
          <RivalField socket={socket} />
        </div>
        <ShipStation ships={ships} />
      </main>
    </div>
  );
};

export default GameField;
