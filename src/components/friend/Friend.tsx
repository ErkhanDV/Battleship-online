import { FC, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useLogInActions, useAppSelector } from '@/hook/_index';
import { gameService } from '@/services/axios/Game';
import { SocketContext } from '@/context/Context';

import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from '@/services/axios/_constants';

const Friend: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sendSocket } = useContext(SocketContext);

  const [friend, setFriend] = useState('');
  const [validation, setValidation] = useState('');

  const { setModalOpen, setModalChildren } = useLogInActions();

  const { isModalOpen, isAuthorized } = useAppSelector((state) => {
    const { isModalOpen, isAuthorized } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;

    return { isModalOpen, isAuthorized, gameInfo };
  });

  useEffect(() => {
    setValidation('');
    setFriend('');
  }, [isModalOpen]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setFriend(target.value);

  const playHandler = async () => {
    if (isAuthorized) {
      if (!friend) {
        setValidation('Enter friend`s name');
        return;
      } else if (friend.length <= 2) {
        setValidation('Name is too short');
        return;
      } else {
        sendSocket(SOCKETMETHOD.invite, { friend });

        const response = await gameService.startGame('', true);
        if (response && typeof response !== 'string') {
          sendSocket(SOCKETMETHOD.connect, response);
        }

        setModalOpen(false);

        if (location.pathname !== ROUTE.game) {
          navigate(ROUTE.game);
        }
      }
    } else {
      setModalOpen(true);
      setModalChildren('log');
    }
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formHandler} className="login">
      <h2 className="friend_title">{t('friendGame')}</h2>
      <input
        className="login_input"
        onChange={inputHandler}
        value={friend}
        type="text"
        placeholder={`${t('enterName')}`}
      />
      <div className="login_validation">{validation}</div>
      <button className="login_button" onClick={() => playHandler()}>
        {t('connect')}
      </button>
    </form>
  );
};

export default Friend;
