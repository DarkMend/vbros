import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";
import { devtools } from 'zustand/middleware';

export interface IUserStore {
    user: IUser
    setUser: (data: IUser) => void
}

export const useUserStore = create<IUserStore>()(devtools(set => ({
    user: { id: undefined, name: undefined, email: undefined },
    setUser: (data: IUser) => set({ user: { id: data.id, name: data.name, email: data.email } })
})));