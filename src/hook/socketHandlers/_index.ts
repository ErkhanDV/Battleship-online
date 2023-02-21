import { useConnectionHandler } from './use-connection';
import { useReadyHandler } from './use-ready';
import { useShootHandler } from './use-shoot';
import { useGameoverHandler } from './use-gameover';
import { useExitHandler } from './use-exit';
import { useChatHandler } from './use-chat';

export const useSocketHandlers = () => {
  const { connectHandler } = useConnectionHandler();
  const { shootHandler } = useShootHandler();
  const { gameoverHandler } = useGameoverHandler();
  const { readyHandler } = useReadyHandler();
  const { exitHandler } = useExitHandler();
  const { chatHandler } = useChatHandler();

  return {
    connectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
  };
};
