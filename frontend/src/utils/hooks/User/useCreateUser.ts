import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { IUser } from "../../../interfaces/user.interface";
import { userService } from "../../../services/user.service";

const KEY = 'createUser'

export const useCreateUser = (options?: IMutationOptions<unknown, IUser>) =>  useMutation({
    mutationKey: [KEY],
    mutationFn: (data) => userService.createUser(data),
    ...options
})