import { useMutation } from "@tanstack/react-query";
import { statusService } from "../../../services/status.service";
import { IMutationOptions } from "../Modal";
import { IStatus } from "../../../interfaces/status.interface";

const KEY = ["deleteStatus"];

export const useDeleteStatus = (options?: IMutationOptions<unknown, IStatus>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => statusService.deleteStatus(data),
    ...options,
  });
