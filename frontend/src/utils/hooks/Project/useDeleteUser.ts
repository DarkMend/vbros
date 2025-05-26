import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["deleteUser"];

export const useDeleteUser = (
  options?: IMutationOptions<unknown, { id: number; user_id: number }>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.deleteUser(data),
    ...options,
  });
