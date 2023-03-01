// import { useEffect, useState } from 'react';

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

  // const [stopUseEffect, setStopUseEffect] = useState(false);

  // useEffect(() => {
  //   console.log('useEffect', stopUseEffect);
  //   if (!stopUseEffect) {
  //     userState.ships.forEach(async (ship) => {
  //       if (ship.decks === ship.woundedCells.length) {
  //         await setStopUseEffect(true);
  //         addNotAllowed(PERSON.user, ship.occupiedCells, ship.decks);
  //         await setStopUseEffect(false);
  //       }
  //     });

  //     rivalState.ships.forEach(async (ship) => {
  //       if (ship.decks === ship.woundedCells.length) {
  //         await setStopUseEffect(true);
  //         addNotAllowed(PERSON.rival, ship.occupiedCells, ship.decks);
  //         await setStopUseEffect(false);
  //       }
  //     });
  //   }
  // }, [userState.ships, rivalState.ships]);

  const shootHandler = (data: IShoot) => {
    const { user, shoot, isAbleShoot } = data;

    if (user === userName) {
      setIsAbleShoot(isAbleShoot);
      checkShoot(PERSON.rival, shoot);
    } else {
      setIsAbleShoot(!isAbleShoot);
      checkShoot(PERSON.user, shoot);
    }
  };

  return { shootHandler };
};
