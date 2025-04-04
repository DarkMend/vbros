import styles from "./ParagraphModal.module.scss";
import cn from "classnames";

export default function ParagraphModal({
  children,
  isBlack,
}: {
  children: string;
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
