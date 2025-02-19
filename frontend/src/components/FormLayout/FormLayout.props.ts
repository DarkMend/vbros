import { FormHTMLAttributes, ReactNode } from "react";

export interface IFormLayout extends FormHTMLAttributes<HTMLFormElement>{
    children: ReactNode,
    isLoading: boolean
}