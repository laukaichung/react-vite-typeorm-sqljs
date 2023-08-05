import React from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {routes} from "./routes";
import {DatabaseProvider} from "./components/database-provider";
import {ErrorBoundary} from "./components/error-boundary";

export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: ErrorBoundary,
    element: (
      <DatabaseProvider>
          <Outlet />
      </DatabaseProvider>
    ),
    children: routes,
  },
]);