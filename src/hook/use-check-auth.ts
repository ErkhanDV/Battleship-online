import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, gameService } from '@/services/axios/_index';
import { useLogInActions } from '@/hook/_index';
import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { IStartGame, TSendSocket } from '@/store/reducers/types/socket';

export const useCheckAuth = (sendSocket: TSendSocket) => {
  const navigate = useNavigate();
  const { setUserName } = useLogInActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const checkAuth = async (friendName = '', isWithFriend = false) => {
    try {
      if (localStorage.getItem('token') && !checkInProccess) {
        setCheckInProccess(true);

        const auth = await authService.checkAuth();

        setCheckInProccess(false);

        if (auth) {
          await setUserName(auth.name);

          // if (location.pathname === ROUTE.game) {
          let response: string | IStartGame | undefined;

          if (isWithFriend) {
            response = await gameService.startGame(friendName, isWithFriend);
          } else {
            response = await gameService.startGame();
          }

          if (typeof response === 'string') {
            return response;
          } else {
            if (response) sendSocket(SOCKETMETHOD.connect, response);
          }
          // }
        } else {
          if (location.pathname === ROUTE.game) navigate(ROUTE.home);
        }
      }

      if (!localStorage.getItem('token') && !checkInProccess) {
        if (location.pathname === ROUTE.game) navigate(ROUTE.home);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { checkAuth };
};
