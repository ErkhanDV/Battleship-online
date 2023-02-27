import { useTranslation } from 'react-i18next';

import { useGameStateActions, useGameShipsActions } from '@/hook/_index';

export const useExitHandler = () => {
  const { t } = useTranslation();
  const { setWinner, resetGameState } = useGameStateActions();
  const { resetGameShips } = useGameShipsActions();

  const exitHandler = () => {
    console.log('exit');
    setWinner(t('Противник вышел из боя'));

    resetGameState();
    resetGameShips();
  };

  return { exitHandler };
};
