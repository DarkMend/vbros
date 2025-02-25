import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";

export interface IUserStore {
    user: IUser
}

export const useUserStore = create<IUserStore>(set => ({
    user: {id: undefined, name: undefined, email: undefined},
    setUser: (data: IUser) => set({user: {id: data.id, name: data.name, email: data.email}})
}));