import { FC, useState, useContext } from 'react';
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

    if (sendSocket) {
      console.log(mail);
      sendSocket(SOCKETMETHOD.chat, { mail });
    }
    setText('');
  };

  return (
    <div className="chat">
      <h2 className="section_title">{t('chat')}</h2>
      <button
        className={`chat_button`}
        onClick={() => changeChat(CHAT.common)}
        type="button"
      >
        {t('generalChat')}
      </button>
      <button
        className={`chat_button`}
        disabled={!gameInfo}
        onClick={() => changeChat(CHAT.game)}
        type="button"
      >
        {t('gameChat')}
      </button>
      <div className="chat_messages">
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
