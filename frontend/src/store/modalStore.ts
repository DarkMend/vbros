import { ReactNode } from "react";
import { create } from "zustand";

export interface IModalStore {
    isOpen: boolean,
    content: ReactNode | null,
    openModal: (content: ReactNode) => void,
    closeModal: () => void
}

export const useModalStore = create<IModalStore>(set => ({
    isOpen: false, 
    content: null,
    openModal: (content) => set({isOpen: true, content}),
    closeModal: () => {
        set({isOpen: false});
    } 
}));