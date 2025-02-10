import { ReactNode } from "react";
import { create } from "zustand";

export interface IModalStore {
    isOpen: boolean,
    content: ReactNode | null,
    isFanding: boolean,
    openModal: (content: ReactNode) => void,
    closeModal: () => void
}

export const useModalStore = create<IModalStore>(set => ({
    isOpen: false, 
    content: null,
    isFanding: false,
    openModal: (content) => set({isOpen: true, content}),
    closeModal: () => {
        set({isOpen: false});

        setTimeout(() => {
            set({content: null, isFanding: false})
        }, 3000)
    } 
}));