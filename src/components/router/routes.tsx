import Home from "@/pages/home/Home";
import LogIn from "@/pages/login/LogIn";

import { IRoute } from "@/types/Types";

const routes: IRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
];

export default routes;
