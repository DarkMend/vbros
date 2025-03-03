import styles from "./ProfileSettings.module.scss";
import ProfileSettingsItem from "./ProfileSettingsItem/ProfileSettingsItem";
import AccountIcon from "./../../../../../public/icons/account.svg";
import GearIcon from "./../../../../../public/icons/gear.svg";
import SupportIcon from "./../../../../../public/icons/support.svg";
import ExitIcon from "./../../../../../public/icons/exit.svg";

export default function ProfileSettings() {
  return (
    <div className={styles["profile-settings"]}>
      <div className={styles["profile-settings__wrapper"]}>
        <ProfileSettingsItem name="Аккаунт" icon={<AccountIcon />} />
        <ProfileSettingsItem name="Настройки" icon={<GearIcon />} />
      </div>
      <div className={styles["hr"]}></div>
      <div className={styles["profile-settings__wrapper"]}>
        <ProfileSettingsItem name="Поддержка" icon={<SupportIcon />} />
      </div>
      <div className={styles["hr"]}></div>
      <div className={styles["profile-settings__wrapper"]}>
        <ProfileSettingsItem name="Выйти" icon={<ExitIcon />} />
      </div>
    </div>
  );
}
