import { FC, useState, useContext, useRef, useEffect } from 'react';
import { SocketContext } from '@/context/Context';
import { useAppSelector, useChatActions } from '@/hook/_index';
import Message from './Message';
import { SOCKETMETHOD } from '@/services/axios/_constants';
import { CHAT } from '@/store/_constants';
import './Chat.scss';

const Chat: FC = () => {
  const { sendSocket } = useContext(SocketContext);
  const { changeChat } = useChatActions();
  const { currentChat } = useAppSelector((state) => state.ChatSlice);
  const { userName } = useAppSelector((state) => state.logInSlice);
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);
  const { game, common } = useAppSelector((state) => state.ChatSlice);
  const [text, setText] = useState('');
  const chatElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatElement.current) {
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    }
  }, [game, common]);

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
      <button onClick={() => changeChat(CHAT.common)} type="button">
        Common
      </button>
      <button
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        Game
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
        <button onClick={sendHandler} type="button">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;
