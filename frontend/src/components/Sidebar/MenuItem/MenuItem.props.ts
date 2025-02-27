import { ReactNode } from "react";

export interface IMenuItem {
    href: string;
    arrowActive?: boolean;
    quantityActive?: boolean;
    name: string;
    icon?: ReactNode
}