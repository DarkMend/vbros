import { forwardRef, TextareaHTMLAttributes } from "react";
import styles from "./MainTextarea.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import cn from "classnames";

export interface IMainTextarea
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  errorMessage?: string;
}

const MainTextarea = forwardRef<HTMLTextAreaElement, IMainTextarea>(
  ({ placeholder, errorMessage, ...props }, ref) => {
    return (
      <div className={styles.textareaWrapper}>
        <textarea
          ref={ref}
          className={cn(styles.textarea, {
            [styles["error"]]: !!errorMessage,
          })}
          placeholder={placeholder}
          {...props}
        ></textarea>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);

export default MainTextarea;
