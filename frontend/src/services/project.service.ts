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
};
