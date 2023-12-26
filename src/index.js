import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import Table from "./Table";
import Form from "./Form";

import NoPage from "./NoPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Table />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/form/:id",
    element: <Form />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
