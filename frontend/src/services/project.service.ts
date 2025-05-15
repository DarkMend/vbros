import { axiosWithAuth } from "../api/interceptors";
import { IProject } from "../interfaces/project.interface";

export const projectService = {
  async createProject(data: IProject) {
    return axiosWithAuth.post("/project/createProject", data);
  },
};
