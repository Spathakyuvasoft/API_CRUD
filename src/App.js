import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
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

export default router;
