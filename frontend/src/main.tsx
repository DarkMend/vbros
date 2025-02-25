import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { DndContext } from "@dnd-kit/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndContext>
        <Modal />
        <ToastContainer draggable />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </DndContext>
    </QueryClientProvider>
  </StrictMode>
);
