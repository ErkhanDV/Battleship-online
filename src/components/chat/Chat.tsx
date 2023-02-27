import { FC, useState, useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '@/context/Context';
import { useAppSelector, useChatActions } from '@/hook/_index';
import Welcome from './welcome/Welcome';
import Message from './message/Message';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { CHAT } from '@/store/_constants';
import './Chat.scss';

const Chat: FC = () => {
  const { t } = useTranslation();
  const { sendSocket } = useContext(SocketContext);
  const { changeChat, setUnreadCommon, setUnreadGame } = useChatActions();
  const {
    currentChat,
    game,
    common,
    userName,
    gameInfo,
    unreadGame,
    unreadCommon,
  } = useAppSelector((state) => {
    const { game } = state.ChatSlice;
    const { common } = state.ChatSlice;
    const { currentChat } = state.ChatSlice;
    const { userName } = state.logInSlice;
    const { gameInfo } = state.gameStateSlice;
    const { unreadGame } = state.ChatSlice;
    const { unreadCommon } = state.ChatSlice;

    return {
      game,
      common,
      currentChat,
      userName,
      gameInfo,
      unreadGame,
      unreadCommon,
    };
  });

  const currUnread = currentChat === CHAT.common ? unreadCommon : unreadGame;
  const [text, setText] = useState('');
  const chatElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatElement.current) {
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    }
  }, [game, common]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setText(target.value);
  };

  const focusHandler = () => {
    if (currentChat === CHAT.common) {
      setTimeout(() => setUnreadCommon(true), 1000);
    } else {
      setTimeout(() => setUnreadGame(true), 1000);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  return (
    <div className="chat">
      <h2 className="section_title">{t('chat')}</h2>
      <button
        className={`chat_button ${currentChat === CHAT.common ? 'active' : ''}`}
        onClick={() => changeChat(CHAT.common)}
        type="button"
      >
        {t('generalChat')}
        <span className="unread">
          {unreadCommon ? `: ${unreadCommon}` : ''}
        </span>
      </button>
      <button
        className={`chat_button ${currentChat === CHAT.game ? 'active' : ''}`}
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        {t('gameChat')}
        <span className="unread"> {unreadGame ? `: ${unreadGame}` : ''}</span>
      </button>

      <div ref={chatElement} className="chat_messages">
        <Welcome />
        {(currentChat === CHAT.common || !gameInfo ? common : game).map(
          (mail, i, messages) => (
            <div key={mail.date.toString()}>
              {messages.length - i === currUnread ? (
                <div className="unread_line">new messages</div>
              ) : null}
              <Message mail={mail} />
            </div>
          ),
        )}
      </div>
      <form onSubmit={submitHandler} className="chat_input">
        <input
          onFocus={focusHandler}
          onChange={inputHandler}
          className="chat_write"
          type="text"
          value={text}
          placeholder={t('send') as string}
        />
        <button className="chat_button" type="submit">
          {t('send')}
        </button>
      </form>
    </div>
  );
};

export default Chat;
