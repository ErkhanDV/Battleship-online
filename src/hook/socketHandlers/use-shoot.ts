import {
  useAppSelector,
  useGameStateActions,
  useGameShipsActions,
} from '@/hook/_index';

import { PERSON } from '@/store/_constants';

import { IShoot } from '@/store/reducers/types/socket';

export const useShootHandler = () => {
  const { setIsAbleShoot } = useGameStateActions();
  const { checkShoot } = useGameShipsActions();

  const { userName } = useAppSelector((state) => state.logInSlice);
  // const userState = useAppSelector((state) => state.gameShipsSlice.user);
  // const rivalState = useAppSelector((state) => state.gameShipsSlice.rival);

  const shootHandler = (data: IShoot) => {
    const { user, shoot, isAbleShoot } = data;

    if (user === userName) {
      setIsAbleShoot(isAbleShoot);
      checkShoot(PERSON.rival, shoot);

      // userState.ships.forEach((ship) => {
      //   if (ship.decks === ship.woundedCells.length) {
      //     addNotAllowed(PERSON.user, ship.occupiedCells, ship.decks);
      //   }
      // });
    } else {
      setIsAbleShoot(!isAbleShoot);
      checkShoot(PERSON.user, shoot);

      // rivalState.ships.forEach((ship) => {
      //   if (ship.decks === ship.woundedCells.length) {
      //     addNotAllowed(PERSON.rival, ship.occupiedCells, ship.decks);
      //   }
      // });
    }
    console.log('shoot');
  };

  return { shootHandler };
};
