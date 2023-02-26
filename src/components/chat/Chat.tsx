import { FC, useState, useContext, useRef, useEffect } from 'react';
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
  const { currentChat, game, common, userName, gameInfo } = useAppSelector(
    (state) => {
      const { game } = state.ChatSlice;
      const { common } = state.ChatSlice;
      const { currentChat } = state.ChatSlice;
      const { userName } = state.logInSlice;
      const { gameInfo } = state.gameStateSlice;

      return { game, common, currentChat, userName, gameInfo };
    },
  );
  const [text, setText] = useState('');
  const chatElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatElement.current) {
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    }
  }, [game, common]);

  const { t } = useTranslation();

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setText(target.value);
  };

  const sendHandler = () => {
    const sendName = userName ? userName : 'Unknown user';
    const mail = {
      name: sendName,
      date: new Date().toString(),
      text: text,
      gameId: gameInfo?.gameId,
      chatName: currentChat,
    };

    sendSocket(SOCKETMETHOD.chat, { mail });
    setText('');
  };

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = minutes < 9 ? `0${minutes}` : `${minutes}`;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendHandler();
  };

  return (
    <div className="chat">
      <h2 className="section_title">{t('chat')}</h2>
      <button
        className={`chat_button ${currentChat === CHAT.common && 'active'}`}
        onClick={() => changeChat(CHAT.common)}
        type="button"
      >
        {t('generalChat')}
      </button>
      <button
        className={`chat_button ${currentChat === CHAT.game && 'active'}`}
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        {t('gameChat')}
      </button>

      <div ref={chatElement} className="chat_messages">
        <div className="message player">
          <div className="message_caption">
            <div className="message_name">{t('admiral')}</div>
            <div className="message_date">
              {hoursView}:{minutesView}
            </div>
          </div>
          <div className="message_text">{t('welcomeMessage')}</div>
        </div>

        {(currentChat === CHAT.common || !gameInfo ? common : game).map(
          (mail) => (
            <Message key={mail.date.toString()} mail={mail} />
          ),
        )}
      </div>
      <form onSubmit={submitHandler} className="chat_input">
        <input
          onChange={inputHandler}
          className="chat_write"
          type="text"
          value={text}
          placeholder={t('Write your message...') as string}
        />
        <button className="chat_button" onClick={sendHandler} type="button">
          {t('send')}
        </button>
      </form>
    </div>
  );
};

export default Chat;
