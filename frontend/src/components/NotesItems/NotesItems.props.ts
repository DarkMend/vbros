import { INote } from "../../interfaces/note.interface";

export interface INotesItems{
    count?: number;
    className?: string;
    icon?: string;
    iconColor?: string;
    name: string; 
    notes: INote[]
}