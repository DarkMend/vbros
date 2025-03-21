import { AxiosResponse } from "axios";
import { axiosClassic, axiosWithAuth } from "../api/interceptors";
import { IUser } from "../interfaces/user.interface";
import { IResponseLogin } from "../utils/hooks/User/useLoginUser";

export const userService = {
  async createUser(data: IUser) {
    return axiosClassic.post<unknown>("/auth/reg", data);
  },

  async loginUser(data: Omit<IUser, "name">) {
    return axiosClassic.post<IResponseLogin>("/auth/login", data);
  },

  async infoUser(): Promise<IUser | undefined> {
    const response: AxiosResponse<{ data: IUser }> = await axiosWithAuth.get(
      "/auth/info"
    );
    return response.data.data;
  },

  async logout() {
    return axiosWithAuth.post("/auth/logout");
  },

  async changeAvatar(data: FormData) {
    return axiosWithAuth.post("/user/changeAvatar", data);
  },
};
