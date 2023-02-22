import { useContext, FC } from 'react';
// <<<<<<< HEAD
// import { SocketContext } from '@/Context';
// import {
//   useAppSelector,
//   useGameShipsActions,
//   useGameStateActions,
// } from '@/hook/_index';
// =======
import { SocketContext } from '@/context/Context';
import {
  useAppSelector,
  useGameShipsActions,
  useGameStateActions,
} from '@/hook/_index';
// >>>>>>> develop
import Cell from '@/components/game/cell/Cell';
import { FIELD } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

import './Field.scss';

import { checkShootToShip, checkWinner } from '@/lib/API/AI/checkAttacks';
import { userTurn } from '@/lib/API/AI/userTurn';

const Field: FC<{ isRival: boolean; isOnline: boolean }> = ({
  isRival,
  isOnline,
}) => {
  const { sendSocket } = useContext(SocketContext);
  const { checkShoot, addNotAllowed } = useGameShipsActions();
  const { setIsAbleShoot } = useGameStateActions();
  const { isAbleShoot, isGameFinded, isStarted, gameDifficult } =
    useAppSelector((state) => state.gameStateSlice);
  const { user, rival } = useAppSelector((state) => state.gameShipsSlice);

  // <<<<<<< HEAD
  //   const shootHandler = (e: React.MouseEvent): void => {
  //     if (e.target instanceof HTMLDivElement && e.target.id) {
  //       const shoot: number = Number(e.target.id);
  //       if (isAbleShoot && isStarted && isRival) {
  //         if (isOnline) {
  //           sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
  //         } else {
  //           userTurn(
  //             rival,
  //             shoot,
  //             checkShoot,
  //             checkShootToShip,
  //             addNotAllowed,
  //             checkWinner,
  //             setIsAbleShoot,
  //             gameDifficult,
  //             user,
  //           );
  //         }
  // =======
  const bgClass = `battleground ${!isAbleShoot && isRival ? 'inactive' : ''}`;

  const shootHandler = ({ target }: React.MouseEvent<HTMLDivElement>): void => {
    const shoot: number = Number((target as HTMLDivElement).id);

    if (isAbleShoot && isStarted && isRival) {
      if (isOnline && sendSocket) {
        sendSocket(SOCKETMETHOD.shoot, { shoot: shoot });
      } else {
        // checkShoot('rival', shoot);

        // setTimeout(() => {
        //   checkShoot('user', getRandomNum(1, 100));
        // }, 1000);
        userTurn(
          rival,
          shoot,
          checkShoot,
          checkShootToShip,
          addNotAllowed,
          checkWinner,
          setIsAbleShoot,
          gameDifficult,
          user,
        );
        // >>>>>>> develop
      }
    }
  };

  return (
    <div onClick={shootHandler} className={bgClass}>
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
      {isGameFinded || !isRival ? null : (
        <div className="connection">Waiting for an opponent...</div>
      )}
    </div>
  );
};

export default Field;
