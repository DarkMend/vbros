import { ReactNode } from "react";
import styles from "./AccountModalItem.module.scss";

export default function AccountModalItem({
  icon,
  name,
  content,
}: {
  icon: ReactNode;
  name: string;
  content?: string;
}) {
  return (
    <div className={styles["list-item"]}>
      <div className={styles["list-item__name"]}>
        <div className={styles["icon"]}>{icon}</div>
        <p>{name}</p>
      </div>
      <div className={styles["list-item__content"]}>{content}</div>
    </div>
  );
}
