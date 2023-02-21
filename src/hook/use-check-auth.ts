import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, gameService } from '@/services/axios/_index';
import { useLogInActions, useSocket } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const [checkInProccess, setCheckInProccess] = useState(false);
  const { init } = useSocket();
  const { setUser } = useLogInActions();

  const checkAuth = async () => {
    if (localStorage.getItem('token') && !checkInProccess) {
      setCheckInProccess(true);
      const auth = await authService.checkAuth();
      setCheckInProccess(false);
      if (auth) {
        if (location.pathname === ROUTE.game) {
          const response = await gameService.startGame();
          if (response) {
            init(response);
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
