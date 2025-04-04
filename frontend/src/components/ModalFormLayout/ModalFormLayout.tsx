import { FormHTMLAttributes, ReactNode } from "react";
import styles from "./ModalFormLayout.module.scss";
import ModalButton from "../ModalButton/ModalButton";
import BackIcon from "../../../public/icons/back.svg";

export interface IModalFormLayout extends FormHTMLAttributes<HTMLFormElement> {
  submitButtonText: string;
  children: ReactNode;
  isPending: boolean;
  closeHandle?: () => void;
  deleteButton?: () => void;
  deletePending?: boolean;
}

export default function ModalFormLayout({
  submitButtonText,
  children,
  isPending,
  closeHandle,
  deleteButton,
  deletePending,
  ...props
}: IModalFormLayout) {
  return (
    <form {...props} className={styles.form}>
      {children}
      <div className={styles.actions}>
        <ModalButton
          icon={<BackIcon />}
          onClick={deleteButton || closeHandle}
          type="button"
          isLoading={deletePending}
          typeButton={deleteButton && "delete"}
        >
          Назад
        </ModalButton>
        <ModalButton isLoading={isPending}>{submitButtonText}</ModalButton>
      </div>
    </form>
  );
}
