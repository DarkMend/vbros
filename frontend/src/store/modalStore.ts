import { ReactNode } from "react";
import { create } from "zustand";

export interface IModalStore {
    isOpen: boolean,
    content: ReactNode | null,
    openModal: (content: ReactNode) => void,
    closeModal: () => void
}

export const modalStore = create<IModalStore>(set => ({
    isOpen: false, 
    content: null,
    openModal: (content) => set({isOpen: false, content}),
    closeModal: () => set({isOpen: false, content: null}) 
}));