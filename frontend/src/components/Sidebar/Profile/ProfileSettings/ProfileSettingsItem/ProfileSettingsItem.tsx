import Loader from "../../../../Loader/Loader";
import styles from "./ProfileSettingsItem.module.scss";
import { IProfileSettingsItem } from "./ProfileSettingsItem.props";
import cn from "classnames";

export default function ProfileSettingsItem({
  icon,
  name,
  isLoading = false,
  deleteButton = false,
  ...props
}: IProfileSettingsItem) {
  return (
    <button
      className={cn(styles["profile-settings__item"], {
        [styles.delete]: deleteButton,
      })}
      {...props}
    >
      <div className={styles["icon"]}>{isLoading ? <Loader /> : icon}</div>
      <div className={styles["text"]}>{name}</div>
    </button>
  );
}
