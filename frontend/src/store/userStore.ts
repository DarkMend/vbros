import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";
import { devtools } from 'zustand/middleware';

export interface IUserStore {
    user: IUser | null,
    setUser: (data: IUser) => void
}

export const useUserStore = create<IUserStore>()(devtools(set => ({
    user: null,
    setUser: (data: IUser) => set({ user: data })
})));