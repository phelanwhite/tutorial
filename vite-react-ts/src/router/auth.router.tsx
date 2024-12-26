import UpdatePage from "@/pages/UpdatePage";
import UploadPage from "@/pages/UploadPage";
import React, { memo } from "react";
import { useRoutes } from "react-router-dom";

const AuthRouter = () => {
  const routes = useRoutes([
    {
      path: "/upload",
      element: <UploadPage />,
    },
    {
      path: "/update-me",
      element: <UpdatePage />,
    },
  ]);
  return routes;
};

export default memo(AuthRouter);
