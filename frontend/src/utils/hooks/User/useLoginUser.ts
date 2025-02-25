import { useMutation } from "@tanstack/react-query";
import { IBasicResponseError, IMutationOptions } from "../Modal";
import { IUser } from "../../../interfaces/user.interface";
import { userService } from "../../../services/user.service";

const KEY = 'loginUser'

export interface IResponseLogin {
    message: string,
    token: string,
    user: IUser
}

export const useLoginUser = (options?: IMutationOptions<IResponseLogin, Omit<IUser, 'name'>>) =>  useMutation<IResponseLogin, IBasicResponseError, Omit<IUser, 'name'>>({
    mutationKey: [KEY],
    mutationFn: (data) => userService.loginUser(data).then(response => response.data),
    ...options
})