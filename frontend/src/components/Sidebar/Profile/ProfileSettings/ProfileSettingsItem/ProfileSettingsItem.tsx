import Loader from "../../../../Loader/Loader";
import styles from "./ProfileSettingsItem.module.scss";
import { IProfileSettingsItem } from "./ProfileSettingsItem.props";

export default function ProfileSettingsItem({
  icon,
  name,
  isLoading = false,
  ...props
}: IProfileSettingsItem) {
  return (
    <button className={styles["profile-settings__item"]} {...props}>
      <div className={styles["icon"]}>
        {
          isLoading ? <Loader/> : icon
        }
      </div>
      <div className={styles["text"]}>{name}</div>
    </button>
  );
}
