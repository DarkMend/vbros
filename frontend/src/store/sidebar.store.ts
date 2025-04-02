import { ReactNode } from "react";
import { create } from "zustand";

export interface ISidebarStore {
  isOpen: boolean;
  content: ReactNode;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;
}

export const useSibebarStore = create<ISidebarStore>((set) => ({
  isOpen: false,
  content: null,
  openSidebar: (content) => set({ isOpen: true, content: content }),
  closeSidebar: () => set({ isOpen: false }),
}));
