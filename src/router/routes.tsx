import { Home, Rules, Game } from '@/pages/_index';
import { Settings } from '@/components/_index';
import { IRoute } from './_types';
import { ROUTE } from './_constants';

const routes: IRoute[] = [
  {
    path: ROUTE.home,
    element: <Home />,
  },
  {
    path: ROUTE.single,
    element: <Game mode={'single'} />,
  },
  {
    path: ROUTE.game,
    element: <Game mode={'online'} />,
  },
  {
    path: ROUTE.rules,
    element: <Rules />,
  },
];

export default routes;
