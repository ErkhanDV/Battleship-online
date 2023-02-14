import Home from '@/pages/home/Home';
import Rules from '@/pages/rules/Rules';
import Settings from '@/components/settings/Settings';
import LogIn from '@/pages/login/LogIn';
import Game from '@/pages/game/Game';
import { IRoute } from './_types';

const routes: IRoute[] = [
  {
    path: '/',
    element: <LogIn />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/rules',
    element: <Rules />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
];

export default routes;
