import { create } from "zustand";
import { IStatus } from "../interfaces/status.interface";

export interface IStatusStore {
  status: IStatus | null;
  setStatus: (status: IStatus) => void;
}

const useStatusStore = create<IStatusStore>((set) => ({
  status: null,
  setStatus: (status) => set({ status: status }),
}));

export { useStatusStore };
