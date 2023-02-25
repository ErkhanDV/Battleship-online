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

import i18n from './i18n';

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

  // ДОБАВИТЬ В lib/utils checkLocalStorage
  if (localStorage.getItem('language') === 'ru') {
    i18n.changeLanguage('ru');
  }

  if (localStorage.getItem('theme_mode') === 'light') {
    document.body.style.setProperty(
      '--background-color-100',
      'rgb(255, 255, 255, 1)',
    );
    document.body.style.setProperty('--text-color-100', 'rgb(0, 0, 0, 1)');
    document.body.style.setProperty('--text-color-50', 'rgb(0, 0, 0, 0.5)');
  }

  if (localStorage.getItem('color_scheme') === 'blue') {
    document.body.style.setProperty(
      '--primary-color-100',
      'rgb(51, 204, 255, 1)',
    );
    document.body.style.setProperty(
      '--primary-color-75',
      'rgb(51, 204, 255, 0.75)',
    );
    document.body.style.setProperty(
      '--primary-color-50',
      'rgb(51, 204, 255, 0.5)',
    );
    document.body.style.setProperty(
      '--primary-color-25',
      'rgb(51, 204, 255, 0.25)',
    );
  }
  //

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
