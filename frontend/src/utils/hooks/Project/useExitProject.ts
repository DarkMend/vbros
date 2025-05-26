import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["exitProject"];

export const useExitProject = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.exitProject(data),
    ...options,
  });
