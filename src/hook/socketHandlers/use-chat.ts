import { useAppSelector, useChatActions } from '@/hook/_index';
import { IMessage } from '@/store/reducers/types/socket';
import { CHAT } from '@/store/_constants';

export const useChatHandler = () => {
  const { pushGameMessage, pushCommonMessage, setUnreadCommon, setUnreadGame } =
    useChatActions();
  const { gameInfo, userName } = useAppSelector((state) => {
    const { gameInfo } = state.gameStateSlice;
    const { userName } = state.logInSlice;

    return { gameInfo, userName };
  });

  const chatHandler = (data: IMessage) => {
    if (data.mail.chatName === CHAT.game) {
      if (gameInfo?.gameId === data.mail.gameId) {
        pushGameMessage(data.mail);

        if (userName !== data.mail.name) setUnreadGame();
      }
    }

    if (data.mail.chatName === CHAT.common) {
      pushCommonMessage(data.mail);
      if (userName !== data.mail.name) setUnreadCommon();
    }

    console.log('chat');
  };

  return { chatHandler };
};
