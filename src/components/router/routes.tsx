import Home from "@/pages/home/Home";
import Play from "@/pages/play/Play";
import Rules from "@/pages/rules/Rules";
import Settings from "@/pages/settings/Settings";
import LogIn from "@/pages/login/LogIn";

import { IRoute } from "@/types/Types";

const routes: IRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/play',
    element: <Play />,
  },
  {
    path: '/rules',
    element: <Rules />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
];

export default routes;
