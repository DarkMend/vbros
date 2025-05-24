import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { statusProjectService } from "../../../services/statusProject.service";

export const KEY_DELETE_STATUS = ["deleteStatusProject"];

export const useDeleteStatusProject = (
  options?: IMutationOptions<unknown, number>
) =>
  useMutation({
    mutationKey: KEY_DELETE_STATUS,
    mutationFn: (data) => statusProjectService.deleteStatusProject(data),
    ...options,
  });
