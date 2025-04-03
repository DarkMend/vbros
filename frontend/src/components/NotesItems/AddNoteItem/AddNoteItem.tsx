import styles from "./AddNoteItem.module.scss";
import PlusIcon from "../../../../public/icons/plus.svg";
import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

export interface IAddNoteItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeButton: "status" | "note";
}

export default function AddNoteItem({ typeButton, ...props }: IAddNoteItem) {
  return (
    <button
      className={cn(styles.noteItem, {
        [styles.status]: typeButton === "status",
      })}
      {...props}
    >
      <div className={styles.content}>
        <div className={styles.icon}>
          <PlusIcon />
        </div>
        <div className={styles.text}>
          {typeButton === "note" ? "Создать заметку" : "Создать статус блок"}
        </div>
      </div>
    </button>
  );
}
