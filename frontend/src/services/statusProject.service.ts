import { axiosWithAuth } from "../api/interceptors";
import { IStatusProject } from "../interfaces/statusProject";

export const statusProjectService = {
  async createStatusProject(data: IStatusProject) {
    return axiosWithAuth.post("/status-project/store", data);
  },

  async updateStatusProject(data: IStatusProject) {
    return axiosWithAuth.put(`/status-project/update/${data.id}`, data);
  },

  async deleteStatusProject(data: number) {
    return axiosWithAuth.delete(`/status-project/delete/${data}`);
  },
};
