import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from '@/router/AppRouter';
import {
  useSocket,
  useCheckAuth,
  useAppSelector,
  useChatActions,
} from '@/hook/_index';
import { SocketContext } from '@/context/Context';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { ROUTE } from '@/router/_constants';
import { SOCKETMETHOD } from './services/axios/_constants';

const App = () => {
  const location = useLocation();
  const { sendSocket } = useSocket();
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);
  const { checkAuth } = useCheckAuth(sendSocket);
  const { resetGameChat } = useChatActions();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const isMatchRoute = [ROUTE.home, ROUTE.rules, ROUTE.single].some(
      (route) => {
        return route === location.pathname;
      },
    );

    if (isMatchRoute && gameInfo) {
      sendSocket(SOCKETMETHOD.exit);
      resetGameChat();
    }
  }, [location]);

  return (
    <div className="App">
      <SocketContext.Provider value={{ sendSocket }}>
        <Header />
        <AppRouter />
        <Footer />
        <Modal />
      </SocketContext.Provider>
      <Background />
    </div>
  );
};

export default App;
