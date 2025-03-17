import styles from "./AvatarPlug.module.scss";

export default function AvatarPlug({ name, ...props }: { name?: string }) {
  return (
    <div {...props} className={styles["plug"]}>
      {name?.split("")[0].toUpperCase()}
    </div>
  );
}
