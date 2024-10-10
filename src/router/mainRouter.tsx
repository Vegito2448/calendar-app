import {
  createBrowserRouter,
  Navigate,
  RouteObject
} from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts";
import { authRoutes, mainRoutes } from "./routesConfig";

export const mainPath = import.meta.env.DEV ? "/" : "/calendar-app/";

export const allRoutes: RouteObject[] = [
  {
    path: `${mainPath}auth/`,
    element: <AuthLayout />,
    children: authRoutes
  },
  {
    path: `${mainPath}`,
    element: <MainLayout />,
    children: mainRoutes
  },
  {
    path: "*",
    element: <Navigate
      to={`${mainPath}auth/login/`}
      replace
    />

  }
];

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(allRoutes);

