import { ClipboardList } from "lucide-react";
import styles from "./AvatarPlug.module.scss";

export default function AvatarPlug({ name, ...props }: { name?: string }) {
  return (
    <div {...props} className={styles["plug"]}>
      {name ? name.split("")[0].toUpperCase() : <ClipboardList />}
    </div>
  );
}
