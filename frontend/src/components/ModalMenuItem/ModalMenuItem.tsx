import { MouseEventHandler, ReactNode } from "react";
import styles from "./ModalMenuItem.module.scss";

export default function ModalMenuItem({
  icon,
  name,
  content,
  clickContent
}: {
  icon: ReactNode;
  name: string;
  content?: string;
  clickContent?: MouseEventHandler
}) {
  return (
    <div className={styles["list-item"]}>
      <div className={styles["list-item__name"]}>
        <div className={styles["list-item__name-hover"]}>{name}</div>
        <div className={styles["icon"]}>{icon}</div>
        <p>{name}</p>
      </div>
      <div className={styles["list-item__content"]} onClick={clickContent}>{content}</div>
    </div>
  );
}
