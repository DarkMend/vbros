import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { projectService } from "../../../services/project.service";

const KEY = ["updateProject"];

export const useUpdateProject = (
  options?: IMutationOptions<unknown, FormData>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => projectService.updateProject(data),
    ...options,
  });
