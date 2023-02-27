import { useTranslation } from 'react-i18next';
import { useGameStateActions, useAppSelector } from '@/hook/_index';
import { IExit } from '@/store/reducers/types/socket';

export const useExitHandler = () => {
  const { t } = useTranslation();
  const { setWinner } = useGameStateActions();
  const { userName, isAuthorized } = useAppSelector((state) => state.logInSlice);


  const exitHandler = (data: IExit) => {
    console.log('exit');


    if (data.user !== userName && isAuthorized) {
      setWinner(t('winExit'));
    }
  };

  return { exitHandler };
};
