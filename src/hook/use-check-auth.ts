import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, gameService } from '@/services/axios/_index';
import { useLogInActions, useGameStateActions } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { TSendData } from '@/store/reducers/types/socket';

export const useCheckAuth = (
  sendSocket: ((method: string, data?: TSendData) => void) | undefined,
) => {
  const navigate = useNavigate();
  const [checkInProccess, setCheckInProccess] = useState(false);
  const { setUser } = useLogInActions();
  const { setUserName } = useGameStateActions();

  const checkAuth = async () => {
    if (localStorage.getItem('token') && !checkInProccess) {
      setCheckInProccess(true);

      const auth = await authService.checkAuth();

      setCheckInProccess(false);

      if (auth) {
        if (location.pathname === ROUTE.game) {
          const response = await gameService.startGame();

          if (response) {
            setUserName(response.user.name);
            if (sendSocket) sendSocket(SOCKETMETHOD.connect, response);
          }
        }

        setUser(auth.name);
      } else {
        if (location.pathname === ROUTE.game) navigate(ROUTE.home);
      }
    }

    if (!localStorage.getItem('token') && !checkInProccess) {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
    }
  };

  return { checkAuth };
};
