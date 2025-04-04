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

  async createStatus(data: IStatus) {
    return axiosWithAuth.post("/status/store", data);
  },

  async updateStatus(data: IStatus) {
    return axiosWithAuth.post(`/status/update/${data.id}`, data);
  },

  async deleteStatus(data: IStatus) {
    return axiosWithAuth.delete(`/status/delete/${data.id}`);
  },
};
