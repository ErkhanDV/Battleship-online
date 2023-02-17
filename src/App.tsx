import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {
  useLogInActions,
  useShipLocationActions,
  useSocket,
} from './hook/_index';
import { SocketContext } from './Context';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { authService } from '@/services/axios/Auth';
import { ROUTE } from '@/router/_constants';
import { PERSON } from './store/_constants';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket, init, setSocket } = useSocket();
  const { setUser } = useLogInActions();
  const { updateShipsLocationState } = useShipLocationActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const check = async () => {
    setCheckInProccess(true);
    const auth = await authService.checkAuth();
    setCheckInProccess(false);
    if (auth) {
      setUser(auth.name);
    } else {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') && !checkInProccess) {
      check();
    }
  }, []);

  useEffect(() => {
    const initialShips = { shipsLocation: [], misses: [] };

    if (location.pathname === ROUTE.home) {
      socket?.close();
      updateShipsLocationState(initialShips, PERSON.user);
      updateShipsLocationState(initialShips, PERSON.rival);
    }
  }, [location]);

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket, setSocket, init }}>
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
