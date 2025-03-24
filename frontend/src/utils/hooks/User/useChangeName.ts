import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { userService } from "../../../services/user.service";
import { IUser } from "../../../interfaces/user.interface";

const KEY = "changeName";

export const useChangeName = (
  options?: IMutationOptions<unknown, Pick<IUser, 'name'>>
) =>
  useMutation({
    mutationKey: [KEY],
    mutationFn: (data) => userService.changeName(data),
    ...options,
  });
