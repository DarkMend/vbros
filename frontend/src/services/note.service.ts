import { axiosClassic } from "../api/interceptors"

export const noteService = {
    async getNotes() {
        return axiosClassic.get('/notes');
    }
}