import { ReactNode } from "react";
import NotesIcon from "./../../../public/icons/notes.svg";
import WorkspaceIcon from "./../../../public/icons/work-obl.svg";
import TeamWortsIcon from "./../../../public/icons/team-works.svg";
import Favourite from "./../../../public/icons/favourite.svg";

interface IMenu {
  href: string;
  icon: ReactNode;
  name: string;
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
    href: "/team-project",
    icon: <TeamWortsIcon />,
    name: "Проекты",
  },
  {
    href: "/favourite",
    icon: <Favourite />,
    name: "Избранное",
  },
];
