import { axiosClassic, axiosWithAuth } from "../api/interceptors";
import { IUser } from "../interfaces/user.interface";
import { IResponseLogin } from "../utils/hooks/User/useLoginUser";

export const userService = {
    async createUser(data: IUser) {
        return axiosClassic.post<unknown>('/auth/reg', data);
    },

    async loginUser(data: Omit<IUser, 'name'>) {
        return axiosClassic.post<IResponseLogin>('/auth/login', data);
    },

    async infoUser(){
        return axiosWithAuth.get('/auth/info');
    }
}