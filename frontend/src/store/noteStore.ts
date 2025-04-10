import { create } from "zustand";
import { IStatus } from "../interfaces/status.interface";

export interface INoteStore {
  allStatuses: IStatus[] | null;
  setAllStatuses: (statuses: IStatus[]) => void;
  status: IStatus | null;
  setStatus: (status: IStatus) => void;
  date: Date | null;
  setDate: (date: Date) => void;
}

const useNoteStore = create<INoteStore>((set) => ({
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

export { useNoteStore };
