import { useAppSelector, useChatActions } from '@/hook/_index';
import { IMessage } from '@/store/reducers/types/socket';
import { CHAT } from '@/store/_constants';

export const useChatHandler = () => {
  const { pushGameMessage, pushCommonMessage } = useChatActions();
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);

  const chatHandler = (data: IMessage) => {
    if (data.mail.chatName === CHAT.game) {
      if (gameInfo?.gameId === data.mail.gameId) {
        pushGameMessage(data.mail);
      }
    }

    if (data.mail.chatName === CHAT.common) {
      pushCommonMessage(data.mail);
    }

    console.log('chat');
  };

  return { chatHandler };
};
