import { ReactNode } from "react";
import { create } from "zustand";

export interface IToastStore {
    isActive: boolean,
    content: ReactNode | null,
    type: 'success' | 'error' | null,
    openToast: (content: ReactNode, type: 'success' | 'error' | null) => void,
    closeToast: () => void
}

export const useToastStore = create<IToastStore>(set => ({
    isActive: false,
    content: null,
    type: null,
    openToast: (content, type ) => set({isActive: true, content: content, type: type}),
    closeToast: () => set({
        isActive: false,
        content: null,
        type: null
    })
}))