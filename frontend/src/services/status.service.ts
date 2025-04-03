import { axiosWithAuth } from "../api/interceptors";
import {
  IStatusWithNotes,
  ResponseStatusWithNotes,
} from "../interfaces/status.interface";

export const statusService = {
  async getPersonalStatuses() {
    return axiosWithAuth.get<ResponseStatusWithNotes<IStatusWithNotes[]>>(
      "/status/all-personal"
    );
  },

  async createStatuses() {
    return;
  },
};
