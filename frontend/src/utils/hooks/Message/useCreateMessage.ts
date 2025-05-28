import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { messageService } from "../../../services/message.service";

const KEY = ["createMessage"];

export const useCreateMessage = (
  options?: IMutationOptions<unknown, FormData>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => messageService.createMessage(data),
    ...options,
  });
