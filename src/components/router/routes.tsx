import Home from '@/pages/home/Home';
import Play from '@/pages/play/Play';
import Rules from '@/pages/rules/Rules';
import Settings from '@/components/settings/Settings';
import LogIn from '@/pages/login/LogIn';

import { IRoute } from '@/types/Types';
import Game from '@/pages/game/Game';

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
    path: '/play',
    element: <Play />,
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
