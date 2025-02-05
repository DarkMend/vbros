import { ReactNode } from "react";
import { create } from "zustand";

export interface IModalStore {
    isOpen: boolean,
    content: ReactNode | null,
    onConfirm: (() => void) | null,
    onCancel: (() => void) | null,
}

export const modalStore = create<IModalStore>(set => ({
    isOpen: false, 
    content: null,
    onConfirm: null,
    onCancel: null,
    // openModal: (content, onConfirm = null, onCancel = null) => set({isOpen: false, content, onConfirm, onCancel}); 
}));