import { useMutation } from "@tanstack/react-query";
import { statusService } from "../../../services/status.service";
import { IMutationOptions } from "../Modal";

export const KEY_DELETE_STATUS = ["deleteStatus"];

export const useDeleteStatus = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY_DELETE_STATUS,
    mutationFn: (data) => statusService.deleteStatus(data),
    ...options,
  });
