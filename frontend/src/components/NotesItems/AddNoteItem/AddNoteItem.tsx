import styles from "./AddNoteItem.module.scss";
import PlusIcon from "../../../../public/icons/plus.svg";
import { ButtonHTMLAttributes } from "react";

export interface IAddNoteItem extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AddNoteItem({ ...props }) {
  return (
    <button className={styles.noteItem} {...props}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <PlusIcon />
        </div>
        <div className={styles.text}>Создать заметку</div>
      </div>
    </button>
  );
}
