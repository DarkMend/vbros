import styles from "./NoteSidebarLayout.module.scss";
import { createPortal } from "react-dom";
import { useSibebarStore } from "../../store/sidebar.store";
import cn from "classnames";
import { MouseEvent } from "react";

export default function NoteSidebarLayout() {
  const { isOpen, content, closeSidebar } = useSibebarStore();

  const handleClose = (e: MouseEvent<HTMLDivElement>) =>
    e.target === e.currentTarget && closeSidebar();

  return createPortal(
    <div
      className={cn(styles.noteLayout, {
        [styles.active]: isOpen,
      })}
      onClick={handleClose}
    >
      <div className={styles.content}>{content}</div>
    </div>,
    document.body
  );
}
