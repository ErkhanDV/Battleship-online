import { useTranslation } from 'react-i18next';
import { useAppSelector, useGameStateActions } from '@/hook/_index';
import { useShootHandler } from './use-shoot';
import { IShoot } from '@/store/reducers/types/socket';

export const useGameoverHandler = () => {
  const { t } = useTranslation();
  const { setIsAbleShoot, setWinner } = useGameStateActions();
  const { shootHandler } = useShootHandler();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const gameoverHandler = (data: IShoot) => {
    const { winner } = data;

    shootHandler(data);
    setIsAbleShoot(false);

    if (winner) {
      if (winner === userName) {
        setWinner(t('winWin'));
      } else {
        setWinner(t('winLose'));
      }
    }
  };

  return { gameoverHandler };
};
