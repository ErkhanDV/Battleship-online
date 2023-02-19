import { Home, Rules, Game } from '@/pages/_index';
import { Settings } from '@/components/_index';
import { IRoute } from './_types';
import SinglePlayer from '@/pages/singlePlayer/SinglePlayer';
import { ROUTE } from './_constants';

const routes: IRoute[] = [
  {
    path: ROUTE.home,
    element: <Home />,
  },
  {
    path: '/singleplayer',
    element: <SinglePlayer />,
  },
  {
    path: ROUTE.game,
    element: <Game />,
  },
  {
    path: ROUTE.rules,
    element: <Rules />,
  },
  {
    path: ROUTE.settings,
    element: <Settings />,
  },
];

export default routes;
