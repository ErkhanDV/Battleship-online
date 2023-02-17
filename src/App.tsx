import { createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {
  useLogInActions,
  useShipLocationActions,
  useSocket,
} from './hook/_index';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { AuthService } from '@/services/axios/Auth';
import { ISocketContext } from './hook/_types';

export const SocketContext = createContext({} as ISocketContext);

const App = () => {
  const location = useLocation();
  const { socket, init } = useSocket();
  const { setUser } = useLogInActions();
  const { updateShipsLocationState } = useShipLocationActions();

  const check = async () => {
    const auth = await AuthService.checkAuth();
    if (auth) {
      setUser(auth.name);
    } else {
      setUser('');
    }
  };

  useEffect(() => {
    const initial = { shipsLocation: [], misses: [] };
    if (localStorage.getItem('token')) {
      check();
    }

    if (location.pathname !== '/game') {
      updateShipsLocationState(initial, 'user');
      updateShipsLocationState(initial, 'rival');
    }
  }, [location]);

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket, init }}>
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
