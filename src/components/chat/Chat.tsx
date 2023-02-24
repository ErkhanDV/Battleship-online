import { FC, useState, useContext, useRef, useEffect } from 'react';
import { SocketContext } from '@/context/Context';
import { useAppSelector, useChatActions } from '@/hook/_index';
import Message from './Message';
import { useTranslation } from 'react-i18next';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { CHAT } from '@/store/_constants';
import './Chat.scss';

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
      <div ref={chatElement} className="chat_messages">
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
