import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NotesPage from "./pages/NotesPage/NotesPage";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import StartPage from "./pages/StartPage/StartPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/notes',
                element: <NotesPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <LoginPage />
            },
            {
                path: '/auth/start',
                element: <StartPage />
            }
        ]
    }
])

export default router;