import { ReactNode } from "react";
import styles from "./ParagraphModal.module.scss";
import cn from "classnames";

export default function ParagraphModal({
  children,
  isBlack,
}: {
  children: ReactNode;
  isBlack?: boolean;
}) {
  return (
    <p
      className={cn(styles.text, {
        [styles.black]: isBlack,
      })}
    >
      {children}
    </p>
  );
}
