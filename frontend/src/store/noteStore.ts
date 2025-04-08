import { create } from "zustand";
import { IStatus } from "../interfaces/status.interface";

export interface INoteStore {
  status: IStatus | null;
  setStatus: (status: IStatus) => void;
  date: Date | null;
  setDate: (date: Date) => void;
}

const useNoteStore = create<INoteStore>((set) => ({
  status: null,
  setStatus: (status) => set({ status: status }),
  date: new Date(),
  setDate: (date) => set({ date: date }),
}));

export { useNoteStore };
