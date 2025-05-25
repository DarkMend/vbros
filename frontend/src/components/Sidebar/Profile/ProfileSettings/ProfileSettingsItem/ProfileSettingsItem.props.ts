import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IProfileSettingsItem
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  name: string;
  isLoading?: boolean;
  deleteButton?: boolean;
}
