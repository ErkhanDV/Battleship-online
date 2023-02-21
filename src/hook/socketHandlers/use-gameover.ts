import { useAppSelector, useGameStateActions } from '@/hook/_index';
import { useShootHandler } from './use-shoot';
import { IShoot } from '@/store/reducers/types/socket';

export const useGameoverHandler = () => {
  const { setIsAbleShoot, setWinner } = useGameStateActions();
  const { shootHandler } = useShootHandler();
  const { userName } = useAppSelector((state) => state.gameStateSlice);

  const gameoverHandler = (data: IShoot) => {
    const { winner } = data;

    shootHandler(data);
    setIsAbleShoot(false);

    if (winner) {
      if (winner === userName) {
        setWinner('Ты засадил вялого этому парню');
      } else {
        setWinner('Тебя отшлепали как собаку сутулую');
      }
    }
  };

  return { gameoverHandler };
};
