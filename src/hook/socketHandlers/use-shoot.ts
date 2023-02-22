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
  const { userName } = useAppSelector((state) => state.gameStateSlice);

  const shootHandler = (data: IShoot) => {
    const { user, shoot, isAbleShoot } = data;

    if (user === userName) {
      setIsAbleShoot(isAbleShoot);
      checkShoot(PERSON.rival, shoot);
    } else {
      setIsAbleShoot(!isAbleShoot ? true : false);
      checkShoot(PERSON.user, shoot);
    }
    console.log('shoot');
  };

  return { shootHandler };
};
