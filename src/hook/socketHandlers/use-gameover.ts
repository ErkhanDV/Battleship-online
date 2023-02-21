import { useAppSelector, useGameStateActions } from '@/hook/_index';
import { useSocketHandlers } from './_index';
import { IShoot } from '@/store/reducers/types/socket';

export const useGameoverHandler = () => {
  const { setIsAbleShoot, setWinner } = useGameStateActions();
  const { shootHandler } = useSocketHandlers();
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
