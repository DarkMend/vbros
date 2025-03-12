import styles from "./ProfileSettingsItem.module.scss";
import { IProfileSettingsItem } from "./ProfileSettingsItem.props";

export default function ProfileSettingsItem({
  icon,
  name,
  ...props
}: IProfileSettingsItem) {
  return (
    <button className={styles["profile-settings__item"]} {...props}>
      <div className={styles["icon"]}>{icon}</div>
      <div className={styles["text"]}>{name}</div>
    </button>
  );
}
