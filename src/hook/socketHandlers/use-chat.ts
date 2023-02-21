import { useAppSelector, useChatActions } from '@/hook/_index';
import { IMessage } from '@/store/reducers/types/socket';

export const useChatHandler = () => {
  const { pushGameMessage, pushCommonMessage } = useChatActions();

  const chatHandler = (data: IMessage) => {
    const { gameInfo } = useAppSelector((state) => state.gameStateSlice);
    if (gameInfo?.gameId === data.message.gameId) {
      pushGameMessage(data.message);
    }

    if (!data.message.gameId) {
      pushCommonMessage(data.message);
    }
  };

  return { chatHandler };
};
