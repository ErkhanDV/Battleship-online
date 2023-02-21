import { FC, useMemo, useState } from 'react';
import { useAppSelector, useChatActions } from '@/hook/_index';
import Message from './Message';
import './Chat.scss';

const Chat: FC = () => {
  const [message, setMessage] = useState('');
  const { currentChat } = useAppSelector((state) => state.ChatSlice);
  const { changeChat } = useChatActions();

  const messages = useMemo(() => {
    const { game, common } = useAppSelector((state) => state.ChatSlice);
    return currentChat === 'common' ? common : game;
  }, [currentChat]);

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setMessage(target.value);

  const sendHandler = () => {

  }

  return (
    <div className="chat">
      <button onClick={() => changeChat()} type="button">
        Common
      </button>
      <button onClick={() => changeChat()} type="button">
        Game
      </button>
      <div className="chat_messages">
        {messages.map((mail) => (
          <Message key={mail.date.toString()} mail={mail} />
        ))}
      </div>
      <div className="chat_input">
        <input
          onChange={inputHandler}
          className="chat_write"
          type="text"
          value={message}
        />
        <button onClick={sendHandler} type="button">Отправить</button>
      </div>
    </div>
  );
};

export default Chat;
