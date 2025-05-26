import { axiosWithAuth } from "../api/interceptors";

export const projectService = {
  async createProject(data: FormData) {
    return axiosWithAuth.post("/project/createProject", data);
  },

  async getProjects() {
    return axiosWithAuth.get("/project/personal-projects");
  },

  async getProject(id: number) {
    return axiosWithAuth.get(`/project/personal-project/${id}`);
  },

  async getStatuses(id: number) {
    return axiosWithAuth.get(`/project/personal-project/${id}/statuses`);
  },

  async updateProject(data: FormData) {
    return axiosWithAuth.post(`/project/update/${data.get("id")}`, data);
  },

  async deleteProject(data: number) {
    return axiosWithAuth.delete(`/project/delete/${data}`);
  },

  async joinProject(data: number) {
    return axiosWithAuth.post(`/projects/${data}/join`);
  },

  async exitProject(data: number) {
    return axiosWithAuth.delete(`/project/${data}/exit`);
  },
};
