import { createBrowserRouter, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Settings from "../pages/Settings";
import About from "../pages/About";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Forbidden from "../pages/Forbidden";
import PermissionRoute from "../components/PermissionRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "user",
            element: <User />,
          },
          {
            path: "settings",
            element: (
              <PermissionRoute permission="settings:view">
                <Settings />
              </PermissionRoute>
            ),
          },
          {
            path: "about",
            element: <About />,
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    element: <Forbidden />,
  },
]);

export default router;
