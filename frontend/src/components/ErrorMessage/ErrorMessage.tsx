import styles from "./ErrorMessage.module.scss";
import cn from "classnames";

export default function ErrorMessage({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <div
      className={cn(styles["error-message"], {
        [styles["active"]]: !!errorMessage,
      })}
    >
      <div className={styles["error-icon"]}>
        <img src="/icons/error-icon.svg" alt="ошибка" />
      </div>
      <p className={styles["error-text"]}>{errorMessage}</p>
    </div>
  );
}
