import { INote } from "../../interfaces/note.interface";

export interface INotesItems{
    className?: string;
    icon?: string;
    iconColor?: string;
    name: string; 
    notes: INote[]
}