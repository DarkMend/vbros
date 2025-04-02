import { ReactNode } from "react";
import styles from "./NoteInfo.module.scss";

export interface INoteInfo {
  icon?: ReactNode;
  text: string;
  color?: string;
}

export default function NoteInfo({ icon, text, color }: INoteInfo) {
  return (
    <button
      className={styles.info}
      style={{
        background: color && `${color}1A`,
        border: color && "none",
      }}
    >
      <div className={styles.icon}>
        {icon ? (
          icon
        ) : (
          <div
            className={styles.circle}
            style={{
              background: color,
              boxShadow: `0px 2px 4px 0px ${color}`,
            }}
          ></div>
        )}
      </div>
      <div className={styles.text}>{text}</div>
    </button>
  );
}
