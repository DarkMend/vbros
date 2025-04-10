import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { noteService } from "../../../services/note.service";

const KEY = ["deleteNote"];

export const useDeleteNote = (options?: IMutationOptions<unknown, number>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => noteService.deleteNote(data),
    ...options,
  });
