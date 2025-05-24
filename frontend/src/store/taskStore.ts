import { create } from "zustand";
import {
  IStatusProject,
  IStatusProjectWithTasks,
} from "../interfaces/statusProject";

export interface ITaskStore {
  allStatuses: IStatusProjectWithTasks[] | null;
  setAllStatuses: (statuses: IStatusProjectWithTasks[]) => void;
  status: IStatusProject | null;
  setStatus: (status: IStatusProject) => void;
  date: Date | null;
  setDate: (date: Date) => void;
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
}));

export { useTaskStore };
