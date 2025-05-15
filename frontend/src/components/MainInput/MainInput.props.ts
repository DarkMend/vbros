import { InputHTMLAttributes } from "react";

export interface IMainInput extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  className?: string;
}
