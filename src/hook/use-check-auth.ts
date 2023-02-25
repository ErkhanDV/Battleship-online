import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, gameService } from '@/services/axios/_index';
import { useLogInActions } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { TSendSocket } from '@/store/reducers/types/socket';

export const useCheckAuth = (sendSocket: TSendSocket) => {
  const navigate = useNavigate();
  const { setUserName } = useLogInActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const checkAuth = async () => {
    if (localStorage.getItem('token') && !checkInProccess) {
      setCheckInProccess(true);

      const auth = await authService.checkAuth();

      setCheckInProccess(false);

      if (auth) {
        setUserName(auth.name);

        if (location.pathname === ROUTE.game) {
          const response = await gameService.startGame();

          if (response) {
            sendSocket(SOCKETMETHOD.connect, response);
          }
        }
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
