import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["createProject"];

export const useCreateProject = (
  options?: IMutationOptions<unknown, FormData>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.createProject(data),
    ...options,
  });
