import { Home, Rules, LogIn, Game } from '@/pages/_index';
import { Settings } from '@/components/_index';
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
