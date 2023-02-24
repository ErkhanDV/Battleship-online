import { IMailing } from '@/store/reducers/types/socket';
import { CHAT } from '@/store/_constants';
import { useChatActions } from '../_index';

export const useMailingHandler = () => {
  const { pushCommonMessage, pushGameMessage } = useChatActions();

  const mailingHandler = (data: IMailing) => {
    console.log('mailing');

    data.chatMessage.forEach((message) => {
      if (data.chatName === CHAT.common) {
        pushCommonMessage(message);
      }

      if (data.chatName === CHAT.game) {
        pushGameMessage(message);
      }
    });
  };

  return { mailingHandler };
};
