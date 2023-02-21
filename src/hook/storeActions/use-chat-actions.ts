import { useAppDispatch } from '@/hook/_index';
import * as chatActions from '@/store/reducers/ChatSlice';
import { IChatMessage } from '@/store/reducers/types/chat';

export const useChatActions = () => {
  const dispatch = useAppDispatch();

  const pushGameMessage = (message: IChatMessage) =>
    dispatch(chatActions.pushGameMessage(message));

  const pushCommonMessage = (message: IChatMessage) =>
    dispatch(chatActions.pushCommonMessage(message));

  const resetGameChat = () => dispatch(chatActions.resetGameChat());

  const resetCommonChat = () => dispatch(chatActions.resetCommonChat());

  const changeChat = () => dispatch(chatActions.changeChat());

  return {
    pushGameMessage,
    pushCommonMessage,
    resetGameChat,
    resetCommonChat,
    changeChat,
  };
};
