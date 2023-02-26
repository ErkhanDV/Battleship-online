import { useTranslation } from 'react-i18next';
import { useGameStateActions, useAppSelector } from '@/hook/_index';
import { IExit } from '@/store/reducers/types/socket';
import { WINNER } from './_constants';

export const useDisconnectHandler = () => {
  const { t } = useTranslation();
  const { setWinner } = useGameStateActions();
  const { userName } = useAppSelector((state) => state.logInSlice);

  const disconnectHandler = ({ user }: IExit) => {
    if (user !== userName) {
      setWinner(t(WINNER.disconnect));
    }
  };

  return { disconnectHandler };
};
