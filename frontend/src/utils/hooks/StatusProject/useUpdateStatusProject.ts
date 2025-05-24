import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { statusProjectService } from "../../../services/statusProject.service";
import { IStatusProject } from "../../../interfaces/statusProject";

const KEY = ["updateStatus"];

export const useUpdateStatusProject = (
  options?: IMutationOptions<unknown, IStatusProject>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => statusProjectService.updateStatusProject(data),
    ...options,
  });
