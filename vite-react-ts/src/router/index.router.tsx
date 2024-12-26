import HomePage from "@/pages/HomePage";
import { memo } from "react";
import { useRoutes } from "react-router-dom";
import AuthRouter from "./auth.router";

const MainRouter = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/me/*",
      element: <AuthRouter />,
    },
  ]);
  return routes;
};

export default memo(MainRouter);
