import { IMailing } from '@/store/reducers/types/socket';
import { useChatActions } from '../_index';

export const useMailingHandler = () => {
  const { pushCommonMessage } = useChatActions();

  const mailingHandler = (data: IMailing) => {
    console.log('mailing');
    data.commonChat.forEach((message) => {
      pushCommonMessage(message);
    });
  };

  return { mailingHandler };
};
