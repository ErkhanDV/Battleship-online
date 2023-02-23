import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { useTranslation } from 'react-i18next';

import { IChatMessage } from '@/store/reducers/types/chat';
import './Message.scss';

const Message: FC<{ mail: IChatMessage }> = ({ mail }) => {
  const { user } = useAppSelector((state) => state.logInSlice);

  const { t } = useTranslation();

  const date = new Date(Date.parse(mail.date));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = hours < 9 ? `0${minutes}` : `${minutes}`;

  return (
    <div className={`message ${mail.name === user ? 'user' : 'player'}`}>
      <div className="message_caption">
        <div className="message_name">
          {mail.name === user ? t('you') : `${mail.name}:`}
        </div>
        <div className="message_date">
          {hoursView}:{minutesView}
        </div>
      </div>

      <div className="message_text">{mail.text}</div>
    </div>
  );
};

export default Message;