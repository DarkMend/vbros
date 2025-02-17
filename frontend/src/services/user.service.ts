import { axiosClassic } from "../api/interceptors";
import { IUser } from "../interfaces/user.interface";

export const userService = {
    async createUser(data: IUser) {
        return axiosClassic.post<unknown>('/auth/reg', data);
    }
}