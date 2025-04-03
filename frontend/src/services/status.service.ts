import { axiosWithAuth } from "../api/interceptors";
import {
  IStatus,
  IStatusWithNotes,
  ResponseStatusWithNotes,
} from "../interfaces/status.interface";

export const statusService = {
  async getPersonalStatuses() {
    return axiosWithAuth.get<ResponseStatusWithNotes<IStatusWithNotes[]>>(
      "/status/all-personal"
    );
  },

  async createStatuses(data: IStatus) {
    return axiosWithAuth.post("/status/store", data);
  },
};
