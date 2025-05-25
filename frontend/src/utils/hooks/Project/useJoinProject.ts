import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["joinProject"];

export const useJoinProject = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.joinProject(data),
    ...options,
  });
