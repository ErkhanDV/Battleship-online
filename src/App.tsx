import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { useLogInActions, useShipLocationActions } from './hook/_index';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { AuthService } from '@/services/axios/Auth';
import { IUser } from '@/services/axios/_types';

const App = () => {
  const location = useLocation();
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
      <Header />
      <AppRouter />
      <Footer />
      <Modal />
      <Background />
    </div>
  );
};

export default App;
