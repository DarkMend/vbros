import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { INote } from "../../../interfaces/note.interface";
import { noteService } from "../../../services/note.service";

const KEY = ["updateNote"];

export const useUpdateNote = (options?: IMutationOptions<unknown, INote>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => noteService.updateNote(data),
    ...options,
  });
