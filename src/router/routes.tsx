import { Home, Rules, Game } from '@/pages/_index';
import { Settings } from '@/components/_index';
import { IRoute } from './_types';
import SinglePlayer from '@/pages/singlePlayer/SinglePlayer';

const routes: IRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/singleplayer',
    element: <SinglePlayer />,
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
