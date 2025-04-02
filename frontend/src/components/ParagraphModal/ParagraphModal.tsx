import styles from "./ParagraphModal.module.scss";

export default function ParagraphModal({ children }: { children: string }) {
  return <p className={styles.text}>{children}</p>;
}
