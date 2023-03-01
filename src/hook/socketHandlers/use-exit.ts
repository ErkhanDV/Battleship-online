import { useTranslation } from 'react-i18next';
import { useGameStateActions, useAppSelector } from '@/hook/_index';
import { IExit } from '@/store/reducers/types/socket';

export const useExitHandler = () => {
  const { t } = useTranslation();
  const { setStatus } = useGameStateActions();
  const { userName, isAuthorized } = useAppSelector((state) => state.logInSlice);


  const exitHandler = (data: IExit) => {
    if (data.user !== userName && isAuthorized) {
      setStatus(t('winExit'));
    }
  };

  return { exitHandler };
};
