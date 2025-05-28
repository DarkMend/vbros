import { axiosWithAuth } from "../api/interceptors";

export const messageService = {
  async getMessages(id: number) {
    return axiosWithAuth.get(`/project-message/${id}/messages`);
  },
};
