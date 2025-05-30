import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./utils/echo";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer draggable />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
