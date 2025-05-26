import { create } from "zustand";
import {
  IStatusProject,
  IStatusProjectWithTasks,
} from "../interfaces/statusProject";
import { IUserWithRole } from "../interfaces/user.interface";

export interface ITaskStore {
  allStatuses: IStatusProjectWithTasks[] | null;
  setAllStatuses: (statuses: IStatusProjectWithTasks[]) => void;
  status: IStatusProject | null;
  setStatus: (status: IStatusProject) => void;
  date: Date | null;
  setDate: (date: Date) => void;
  allUsers: IUserWithRole[] | null;
  setAllUsers: (users: IUserWithRole[]) => void;
  user: IUserWithRole | null;
  setUser: (user: IUserWithRole) => void;
  currentUser: IUserWithRole | null;
  setCurrentUser: (user: IUserWithRole) => void;
}

const useTaskStore = create<ITaskStore>((set) => ({
  allStatuses: null,
  setAllStatuses: (statuses) => set({ allStatuses: statuses }),
  status: null,
  setStatus: (status) => set({ status: status }),
  date: new Date(),
  setDate: (date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    set({ date: dateObj });
  },
  allUsers: null,
  setAllUsers: (users) => set({ allUsers: users }),
  user: null,
  setUser: (user) => set({ user: user }),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export { useTaskStore };
