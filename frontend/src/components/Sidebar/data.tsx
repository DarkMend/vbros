import { ReactNode } from "react";
import NotesIcon from "./../../../public/icons/notes.svg";
import WorkspaceIcon from "./../../../public/icons/work-obl.svg";
import Favourite from "./../../../public/icons/favourite.svg";

interface IMenu {
  href: string;
  icon: ReactNode;
  name: string;
  teamProject?: boolean;
}

export const menu: IMenu[] = [
  {
    href: "/workspace",
    icon: <WorkspaceIcon />,
    name: "Рабочая область",
  },
  {
    href: "/notes",
    icon: <NotesIcon />,
    name: "Заметки по этапам",
  },
  {
    href: "/favourite",
    icon: <Favourite />,
    name: "Избранное",
  },
];
