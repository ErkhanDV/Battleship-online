import { FC, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useLogInActions,
  useAppSelector,
  useInviteStateActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';

import { SOCKETMETHOD } from '@/services/axios/_constants';

const Friend: FC = () => {
  const { t } = useTranslation();
  const { sendSocket } = useContext(SocketContext);

  const [friend, setFriend] = useState('');
  const [validation, setValidation] = useState('');

  const { setModalOpen, setModalChildren } = useLogInActions();
  const { setInviteInProgress, setInviteTo } = useInviteStateActions();

  const {
    isModalOpen,
    isAuthorized,
    userName,
    inviteValidation,
    inviteInProgress,
  } = useAppSelector((state) => {
    const { isModalOpen, isAuthorized, userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;
    const { inviteValidation, inviteInProgress } = state.InviteStateSlice;

    return {
      isModalOpen,
      isAuthorized,
      gameInfo,
      userName,
      inviteValidation,
      inviteInProgress,
    };
  });

  useEffect(() => {
    setValidation('');
    setFriend('');
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setFriend(target.value.trim());

  const playHandler = async () => {
    if (isAuthorized) {
      if (!friend) {
        setValidation('Enter friend`s name');
        return;
      } else if (friend.length <= 3) {
        setValidation('Name is too short');
        return;
      } else {
        const message = { server: userName, friend };
        setInviteTo(friend)

        sendSocket(SOCKETMETHOD.invite, message);
      }
    } else {
      setModalOpen(true);
      setModalChildren('log');
    }
  };

  const cancelHandler = () => {
    const message = {
      server: userName,
      friend,
      isFinded: true,
      isDeclined: true,
    };

    sendSocket(SOCKETMETHOD.invite, message);
    setInviteInProgress(false);
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formHandler} className="login">
      <h2 className="friend_title">{t('friendGame')}</h2>
      {!inviteInProgress ? (
        <input
          className="login_input"
          onChange={inputHandler}
          value={friend}
          type="text"
          placeholder={`${t('enterName')}`}
        />
      ) : null}

      <div className="login_validation">{validation}</div>
      {inviteValidation ? (
        <div className="login_validation">{inviteValidation}</div>
      ) : null}

      {!inviteInProgress ? (
        <button className="login_button" onClick={() => playHandler()}>
          {t('connect')}
        </button>
      ) : (
        <button className="login_button" onClick={() => cancelHandler()}>
          {t('cancel')}
        </button>
      )}
    </form>
  );
};

export default Friend;
