import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NotesPage from "./pages/NotesPage/NotesPage";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import StartPage from "./pages/StartPage/StartPage";
import RegPage from "./pages/RegPage/RegPage";
import PrivateProvider from "./providers/PrivateProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateProvider>
        <MainLayout />
      </PrivateProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/notes",
        element: <NotesPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/reg",
        element: <RegPage />,
      },
      {
        path: "/auth/start",
        element: <StartPage />,
      },
    ],
  },
]);

export default router;
