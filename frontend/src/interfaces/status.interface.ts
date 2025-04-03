import { INote } from "./note.interface";

export interface IStatus {
  id: number;
  name: string;
  color: string;
  user_id: number;
}

export type ResponseStatusWithNotes<T> = {
  data: T;
};

export interface IStatusWithNotes extends IStatus {
  notes: INote[];
}
