import { ReactNode } from "react";
import styles from "./NotesWrapper.module.scss";
import cn from "classnames";

export interface INotesWrapper {
  children: ReactNode;
  className?: string;
}

export default function NotesWrapper({ children, className }: INotesWrapper) {
  return (
    <div className={cn(styles.notesWrapper, className)}>
      <div className={styles.notesWrapperStatus}>{children}</div>
    </div>
  );
}
