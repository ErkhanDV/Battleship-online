import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { IChatMessage } from '@/store/reducers/types/chat';
import './Message.scss';

const Message: FC<{ mail: IChatMessage }> = ({ mail }) => {
  const { userName } = useAppSelector((state) => state.logInSlice);

  const bgClass = ` ${mail.name === userName ? 'my' : ''} message`;
  const date = new Date(Date.parse(mail.date));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = minutes < 9 ? `0${minutes}` : `${minutes}`;

  return (
    <div className={bgClass}>
      <div className="date">
        {hoursView} : {minutesView}
      </div>
      <div className="name">{mail.name === userName ? ':Me' : `${mail.name}:`}</div>
      <div className="text">{mail.text}</div>
    </div>
  );
};

export default Message;
