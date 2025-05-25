import { axiosWithAuth } from "../api/interceptors";
import { ITask } from "../interfaces/task";

export const taskService = {
  async createTask(data: ITask) {
    return axiosWithAuth.post("/task/create", data);
  },

  async updateTask(data: Omit<ITask, "project_id">) {
    return axiosWithAuth.put(`/task/update/${data.id}`, data);
  },

  async deleteTask(data: number) {
    return axiosWithAuth.delete(`/task/delete/${data}`);
  },

  async changeStatusTask(data: { id: number; status_project_id: number }) {
    return axiosWithAuth.put(`/task/change-status/${data.id}`, data);
  },
};
