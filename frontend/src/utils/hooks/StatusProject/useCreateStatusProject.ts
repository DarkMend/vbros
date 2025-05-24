import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { IStatusProject } from "../../../interfaces/statusProject";
import { statusProjectService } from "../../../services/statusProject.service";

const KEY = ["createStatusProject"];

export const useCreateStatusProject = (
  options?: IMutationOptions<unknown, IStatusProject>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => statusProjectService.createStatusProject(data),
    ...options,
  });
