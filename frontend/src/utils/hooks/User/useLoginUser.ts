import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { IUser } from "../../../interfaces/user.interface";
import { userService } from "../../../services/user.service";

const KEY = 'loginUser'

export const useLoginUser = (options?: IMutationOptions<unknown, Omit<IUser, 'name'>>) =>  useMutation({
    mutationKey: [KEY],
    mutationFn: (data) => userService.loginUser(data),
    ...options
})