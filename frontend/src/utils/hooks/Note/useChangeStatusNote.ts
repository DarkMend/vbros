import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { noteService } from "../../../services/note.service";

const KEY = ["changeStatusNote"];

export const useChangeStautsNote = (
  options?: IMutationOptions<unknown, { id: number; status_id: number }>
) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => noteService.changeStatus(data),
    ...options,
  });
