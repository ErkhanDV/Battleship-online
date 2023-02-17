import { type FC } from 'react';
import '../game/game.scss';
import GameField from '@/components/game/gameField/gameField';
import { useGameStateActions } from '@/hook/use-game-state-actios';

const SinglePlayer: FC = () => {
  const { changeGameMode } = useGameStateActions();
  changeGameMode(true);

  return <GameField />;
};

export default SinglePlayer;
