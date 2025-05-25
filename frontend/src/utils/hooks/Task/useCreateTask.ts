import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { ITask } from "../../../interfaces/task";
import { taskService } from "../../../services/task.service";

const KEY = ["createTask"];

export const useCreateTask = (options?: IMutationOptions<unknown, ITask>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => taskService.createTask(data),
    ...options,
  });
