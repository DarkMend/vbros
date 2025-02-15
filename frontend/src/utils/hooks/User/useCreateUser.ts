import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { IUser } from "../../../interfaces/user.interface";

export const useCreateUser = (options?: IMutationOptions<unknown, IUser>) =>  useMutation({
    
})