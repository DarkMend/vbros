import { MouseEventHandler, ReactNode } from "react";
import styles from "./ModalMenuItem.module.scss";
import { EditIcon } from "lucide-react";
import classNames from "classnames";

export default function ModalMenuItem({
  icon,
  name,
  content,
  clickContent,
  edit = true
}: {
  icon: ReactNode;
  name: string;
  content?: string;
  clickContent?: MouseEventHandler;
  edit?: boolean
}) {
  return (
    <div className={styles["list-item"]}>
      <div className={styles["list-item__name"]}>
        <div className={styles["list-item__name-hover"]}>{name}</div>
        <div className={styles["icon"]}>{icon}</div>
        <p>{name}</p>
      </div>
      <div className={styles["list-item__content"]} >
        <div className={classNames(styles['edit'], {
          [styles['active']]: edit
        })} onClick={clickContent}>
          <EditIcon />
        </div>
        {content}
      </div>
    </div>
  );
}
