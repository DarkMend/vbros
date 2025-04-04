import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IModalButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  isLoading?: boolean;
  typeButton?: "delete";
}
