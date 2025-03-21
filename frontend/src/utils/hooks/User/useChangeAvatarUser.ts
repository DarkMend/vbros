import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { userService } from "../../../services/user.service";

const KEY = "changeAvatar";

export const useChangeAvatarUser = (
  options?: IMutationOptions<unknown, FormData>
) =>
  useMutation({
    mutationKey: [KEY],
    mutationFn: (data) => userService.changeAvatar(data),
    ...options,
  });
