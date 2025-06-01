import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { ITask } from "../../../interfaces/task";
import { taskService } from "../../../services/task.service";

const KEY = ["updateTask"];

export const useUpdateTask = (options?: IMutationOptions<unknown, ITask>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => taskService.updateTask(data),
    ...options,
  });
