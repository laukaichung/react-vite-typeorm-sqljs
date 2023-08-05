import { RouteObject } from "react-router/dist/lib/context";

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./pages/home"),
  },
];
