import { FC, useContext } from 'react';

import './Modal.scss';

import { LogIn, Settings, Friend, Invite } from '../_index';

import {
  useAppSelector,
  useInviteStateActions,
  useLogInActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import { MODAL } from '@/store/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Modal: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const { setModalOpen } = useLogInActions();
  const { setInvite } = useInviteStateActions();

  const { modalChildren, isModalOpen, userName } = useAppSelector(
    (state) => state.logInSlice,
  );
  const { invite, inviteInProgress } = useAppSelector(
    (state) => state.InviteStateSlice,
  );

  let modalComponent;

  switch (modalChildren) {
    case MODAL.log:
      modalComponent = <LogIn />;
      break;

    case MODAL.settings:
      modalComponent = <Settings />;
      break;

    case MODAL.friend:
      modalComponent = <Friend />;
      break;

    case MODAL.invite:
      modalComponent = <Invite />;
  }

  const closeHandler = () => {
    if (invite) {
      const message = {
        server: invite,
        friend: userName,
        isDeclined: true,
        isFinded: true,
      };

      sendSocket(SOCKETMETHOD.invite, message);
      setInvite('');
    }

    if (inviteInProgress) {
      const message = {
        server: userName,
        friend: friend,
        isDeclined: true,
        isFinded: true,
      };

      sendSocket(SOCKETMETHOD.invite, message);
    }

    setModalOpen(false);
  };

  return (
    <div className={`modal ${isModalOpen && 'open'}`} onClick={closeHandler}>
      <div
        className={`modal_content ${isModalOpen && 'open'}`}
        onClick={(event) => event.stopPropagation()}
      >
        {modalComponent}
      </div>
    </div>
  );
};

export default Modal;
