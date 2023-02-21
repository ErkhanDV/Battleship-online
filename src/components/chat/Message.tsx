import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { IChatMessage } from '@/store/reducers/types/chat';
import './Message.scss';

const Message: FC<{ mail: IChatMessage }> = ({ mail }) => {
  const { user } = useAppSelector((state) => state.logInSlice);

  const bgClass = ` ${mail.name === user ? 'my' : ''} message`;
  const hours = mail.date.getHours();
  const minutes = mail.date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = hours < 9 ? `0${minutes}` : `${minutes}`;

  return (
    <div className={bgClass}>
      <div className="date">
        {hoursView} : {minutesView}
      </div>
      <div className="name">{mail.name}:</div>
      <div className="text">{mail.text}</div>
    </div>
  );
};

export default Message;
