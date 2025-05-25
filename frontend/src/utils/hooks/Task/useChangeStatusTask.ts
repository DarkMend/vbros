import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { taskService } from "../../../services/task.service";

const KEY = ["changeStatus"];

export const useChangeStatusTask = (
  options?: IMutationOptions<unknown, { id: number; status_project_id: number }>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => taskService.changeStatusTask(data),
    ...options,
  });
