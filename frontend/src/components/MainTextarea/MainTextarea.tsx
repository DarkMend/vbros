import { forwardRef, TextareaHTMLAttributes } from "react";
import styles from "./MainTextarea.module.scss";

export interface IMainTextarea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
}

const MainTextarea = forwardRef<HTMLTextAreaElement, IMainTextarea>(
  ({ placeholder, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={styles.textarea}
        placeholder={placeholder}
        {...props}
      ></textarea>
    );
  }
);

export default MainTextarea;
