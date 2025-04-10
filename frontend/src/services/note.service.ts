import { axiosClassic, axiosWithAuth } from "../api/interceptors";
import { INote } from "../interfaces/note.interface";

export const noteService = {
  async getNotes() {
    return axiosClassic.get("/notes");
  },

  async createNote(data: INote) {
    return axiosWithAuth.post("/note/store", data);
  },

  async updateNote(data: INote) {
    return axiosWithAuth.put(`/note/${data.id}/update`, data);
  },

  async deleteNote(id: number) {
    return axiosWithAuth.delete(`/note/${id}/delete`);
  },
};
