import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { taskService } from "../../../services/task.service";

const KEY = ["deleteTask"];

export const useDeleteTask = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => taskService.deleteTask(data),
    ...options,
  });
