import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useAppSelector,
  useLogInActions,
  useGameStateActions,
} from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import { SocketContext } from '@/context/Context';

import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Invite: FC = () => {
  const navigate = useNavigate();
  const { sendSocket } = useContext(SocketContext);
  const { setModalOpen } = useLogInActions();
  const { setInvite } = useGameStateActions();

  const { invite } = useAppSelector((state) => state.gameStateSlice);
  const { isAuthorized } = useAppSelector((state) => state.logInSlice);

  const [validation, setValidation] = useState('');

  const acceptHandler = async () => {
    if (isAuthorized) {
      const response = await gameService.startGame(invite, true);

      setInvite('');

      if (typeof response === 'string') {
        setValidation(response);

        setTimeout(() => {
          setValidation('');
          setModalOpen(false);
        }, 2000);

        return;
      }
      if (response && typeof response !== 'string') {
        sendSocket(SOCKETMETHOD.connect, response);
      }

      setModalOpen(false);

      if (location.pathname !== ROUTE.game) {
        navigate(ROUTE.game);
      }
    }
  };

  const declineHandler = () => {
    setModalOpen(false);
    setInvite('');
    return;
  };

  return (
    <div className="login">
      <h2 className="invite_title">{`${invite} invite you to battle with him...`}</h2>
      <button className="login_button" onClick={acceptHandler}>
        Play
      </button>
      <button className="login_button" onClick={declineHandler}>
        Decline
      </button>
      <span className="login_validation">{validation}</span>
    </div>
  );
};

export default Invite;
