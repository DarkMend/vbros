import { create } from "zustand";
import { IUser } from "../interfaces/user.interface";

export interface IUserStore {
    user: IUser
}

export const useUserStore = create<IUserStore>(set => ({
    user: {id: null, name: undefined, email: undefined},
    // setUser: () => set()
}));