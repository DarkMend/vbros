import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["deleteProject"];

export const useDeleteProject = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.deleteProject(data),
    ...options,
  });
