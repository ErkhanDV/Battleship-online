import { FC, useState, useContext } from 'react';
import { SocketContext } from '@/context/Context';
import { useAppSelector, useChatActions } from '@/hook/_index';
import Message from './Message';
import { useTranslation } from 'react-i18next';

import './Chat.scss';

import { SOCKETMETHOD } from '@/services/axios/_constants';
import { CHAT } from '@/store/_constants';

const Chat: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const { changeChat } = useChatActions();
  const { currentChat } = useAppSelector((state) => state.ChatSlice);
  const { userName } = useAppSelector((state) => state.logInSlice);
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);
  const { game, common } = useAppSelector((state) => state.ChatSlice);
  const [text, setText] = useState('');

  const { t } = useTranslation();

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setText(target.value);

  const sendHandler = () => {
    const mail = {
      name: userName,
      date: new Date().toString(),
      text: text,
      gameId: undefined as undefined | string,
    };

    mail.gameId = currentChat === CHAT.common ? undefined : gameInfo?.gameId;
    sendSocket(SOCKETMETHOD.chat, { mail });
    setText('');
  };

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = minutes < 9 ? `0${minutes}` : `${minutes}`;

  return (
    <div className="chat">
      <h2 className="section_title">{t('chat')}</h2>
      <button
        className={`chat_button ${currentChat === CHAT.common ? 'active' : ''}`}
        onClick={() => changeChat(CHAT.common)}
        type="button"
      >
        {t('generalChat')}
      </button>
      <button
        className={`chat_button ${currentChat === CHAT.game ? 'active' : ''}`}
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        {t('gameChat')}
      </button>
      <div className="chat_messages">
        <div className="message player">
          <div className="message_caption">
            <div className="message_name">{t('admiral')}</div>
            <div className="message_date">{hoursView}:{minutesView}</div>
          </div>
          <div className="message_text">{t('welcomeMessage')}</div>
        </div>
        {(currentChat === CHAT.common || !gameInfo ? common : game).map(
          (mail) => (
            <Message key={mail.date.toString()} mail={mail} />
          ),
        )}
      </div>
      <div className="chat_input">
        <input
          onChange={inputHandler}
          className="chat_write"
          type="text"
          value={text}
        />
        <button className="chat_button" onClick={sendHandler} type="button">
          {t('send')}
        </button>
      </div>
    </div>
  );
};

export default Chat;
