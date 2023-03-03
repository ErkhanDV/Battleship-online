import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  useLogInActions,
  useAppSelector,
  useInviteStateActions,
} from '@/hook/_index';
import { gameService } from '@/services/axios/Game';

import { MODAL } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { ROUTE } from '@/router/_constants';

import { IInvite, TSendSocket } from '@/store/reducers/types/socket';

export const useInviteHandler = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setModalChildren, setModalOpen } = useLogInActions();
  const {
    setInviteValidation,
    setInvite,
    setInviteInProgress,
    resetInviteState,
  } = useInviteStateActions();

  const { userName } = useAppSelector((state) => state.logInSlice);

  const inviteHandler = async (
    { server, friend, isDeclined, isFinded, isAproved }: IInvite,
    sendSocket: TSendSocket,
  ) => {
    if (isAproved) {
      if (server === userName) {
        const response = await gameService.startGame('', true);

        if (response && typeof response !== 'string') {
          sendSocket(SOCKETMETHOD.connect, response);
        }

        if (location.pathname !== ROUTE.game) {
          navigate(ROUTE.game);
        }
        setModalOpen(false);
      } else {
        setTimeout(async () => {
          const response = await gameService.startGame(server, true);

          if (response && typeof response !== 'string') {
            sendSocket(SOCKETMETHOD.connect, response);
          }

          if (location.pathname !== ROUTE.game) {
            navigate(ROUTE.game);
          }
          setModalOpen(false);
        }, 3000);
      }
      resetInviteState();
      return;
    }

    if (friend === userName && !isDeclined) {
      setInvite(server);
      setModalChildren(MODAL.invite);
      setModalOpen(true);

      return;
    }

    if (server === userName && !isDeclined) {
      if (isFinded) {
        setInviteInProgress(true);
      } else {
        setInviteValidation(t('inviteNotFound'));

        setTimeout(() => {
          setInviteValidation('');
        }, 2000);
      }
      return;
    }

    if (userName === friend && isDeclined) {
      resetInviteState();
      setModalOpen(false);
    }

    if (server === userName && isDeclined) {
      setInviteInProgress(false);
      setInviteValidation(t('inviteDeclined'));

      setTimeout(() => {
        setInviteValidation('');
      }, 2000);
    }
  };

  return { inviteHandler };
};
