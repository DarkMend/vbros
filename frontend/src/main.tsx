import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { DndContext } from '@dnd-kit/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndContext>
      <RouterProvider router={router} />
    </DndContext>
  </StrictMode>,
)
