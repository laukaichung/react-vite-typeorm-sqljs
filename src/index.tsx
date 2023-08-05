import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <RouterProvider router={router} fallbackElement={<div>loading</div>} />
);
