import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {
  useLogInActions,
  useShipLocationActions,
  useSocket,
} from './hook/_index';
import { SocketContext } from './Context';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { AuthService } from '@/services/axios/Auth';
import { ROUTE } from '@/router/_constants';
import { PERSON } from './store/_constants';

const App = () => {
  const location = useLocation();
  const { socket, init } = useSocket();
  const { setUser } = useLogInActions();
  const { updateShipsLocationState } = useShipLocationActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const check = async () => {
    setCheckInProccess(true);
    const auth = await AuthService.checkAuth();
    setCheckInProccess(false);
    if (auth) {
      setUser(auth.name);
    } else {
      setUser('');
    }
  };

  useEffect(() => {
    const initialShips = { shipsLocation: [], misses: [] };
    if (localStorage.getItem('token') && !checkInProccess) {
      check();
    }

    if (location.pathname === ROUTE.home) {
      socket?.close();
      updateShipsLocationState(initialShips, PERSON.user);
      updateShipsLocationState(initialShips, PERSON.rival);
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
