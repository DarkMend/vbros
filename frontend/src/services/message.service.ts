import { axiosWithAuth } from "../api/interceptors";

export const messageService = {
  async getMessages(id: number) {
    return axiosWithAuth.get(`/project-message/${id}/messages`);
  },

  async createMessage(data: FormData) {
    return axiosWithAuth.post(`/project-message/${data.get("id")}/store`, data);
  },
};
