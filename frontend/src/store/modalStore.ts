import { ReactNode } from "react";
import { create } from "zustand";

export interface IModalStore {
  isOpen: boolean;
  isContentOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  changeContent: (content: ReactNode) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  isOpen: false,
  isContentOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content, isContentOpen: true }),
  closeModal: () => {
    set({ content: null, isContentOpen: false });
    setTimeout(() => set({ isOpen: false }), 100);
  },
  changeContent: (content: ReactNode) => {
    set({ isContentOpen: false });
    setTimeout(() => {
      set({ isContentOpen: true, content });
    }, 200);
  },
}));
