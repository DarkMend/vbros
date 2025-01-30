import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { DndContext } from '@dnd-kit/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndContext>
        <RouterProvider router={router} />
      </DndContext>
    </QueryClientProvider>
  </StrictMode>,
)
