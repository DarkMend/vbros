import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "../Modal";
import { INote } from "../../../interfaces/note.interface";
import { noteService } from "../../../services/note.service";

const KEY = ["createNote"];

export const useCreateNote = (options?: IMutationOptions<unknown, INote>) =>
  useMutation({
    mutationKey: KEY,
    mutationFn: (data) => noteService.createNote(data),
    ...options,
  });
