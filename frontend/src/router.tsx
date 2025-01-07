import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NotesPage from "./pages/NotesPage/NotesPage";

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
    }
])

export default router;