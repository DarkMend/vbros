import { forwardRef } from "react";
import styles from "./MainInput.module.scss";
import { IMainInput } from "./MainInput.props";
import cn from "classnames";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MainInput = forwardRef<HTMLInputElement, IMainInput>(
  ({ type = "text", placeholder, errorMessage, className, ...props }, ref) => {
    return (
      <div className={styles["input__wrapper"]}>
        <input
          type={type}
          {...props}
          ref={ref}
          placeholder={placeholder}
          className={cn(styles["input"], className, {
            [styles["error"]]: !!errorMessage,
          })}
        />
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
);

export default MainInput;
