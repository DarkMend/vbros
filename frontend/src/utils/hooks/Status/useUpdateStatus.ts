import { useMutation } from "@tanstack/react-query";
import { statusService } from "../../../services/status.service";
import { IMutationOptions } from "../Modal";
import { IStatus } from "../../../interfaces/status.interface";

const KEY = ["updateStatus"];

export const useUpdateStatus = (options?: IMutationOptions<unknown, IStatus>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => statusService.updateStatus(data),
    ...options,
  });
