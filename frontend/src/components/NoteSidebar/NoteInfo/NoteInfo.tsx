import { ReactNode } from "react";
import styles from "./NoteInfo.module.scss";

export interface INoteInfo {
  icon?: ReactNode;
  text: string;
  color?: string;
}

export default function NoteInfo({ icon, text, color }: INoteInfo) {
  return (
    <div className={styles.info}>
      <div className={styles.icon}>
        {icon ? (
          icon
        ) : (
          <div
            className={styles.circle}
            style={{
              background: color,
              boxShadow: "0px 2px 4px 0px #008CFF80",
            }}
          ></div>
        )}
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
