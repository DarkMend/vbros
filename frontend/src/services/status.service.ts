import { axiosWithAuth } from "../api/interceptors";
import {
  IStatusWithNotes,
  ResponseStatusWithNotes,
} from "../interfaces/status.interface";

export const statusService = {
  async getStatuses() {
    return axiosWithAuth.get<ResponseStatusWithNotes<IStatusWithNotes[]>>(
      "/status/all-personal"
    );
  },
};
