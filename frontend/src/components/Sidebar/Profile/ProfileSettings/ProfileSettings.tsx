import styles from "./ProfileSettings.module.scss";
import ProfileSettingsItem from "./ProfileSettingsItem/ProfileSettingsItem";
import AccountIcon from "./../../../../../public/icons/account.svg";
import GearIcon from "./../../../../../public/icons/gear.svg";
import SupportIcon from "./../../../../../public/icons/support.svg";
import ExitIcon from "./../../../../../public/icons/exit.svg";
import cn from "classnames";
import { IProfileSettings } from "./ProfileSettigns.props";
import { forwardRef } from "react";
import { userService } from "../../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../../utils/helpers/removeToken";
import { useMutation } from "@tanstack/react-query";

const ProfileSettings = forwardRef<HTMLDivElement, IProfileSettings>(
  ({ isActive = false, ...props }, ref) => {

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
      mutationKey: ["logout"],
      mutationFn: () => userService.logout(),
      onSuccess() {
        removeToken();
        navigate("/auth/start");
      }
    });

    const logout = async () => {
      mutate();
    };

    return (
      <div
        className={cn(styles["profile-settings"], {
          [styles["active"]]: isActive,
        })}
        {...props}
        ref={ref}
      >
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
          <ProfileSettingsItem
            isLoading={isPending}
            name="Выйти"
            icon={<ExitIcon />}
            onClick={logout}
          />
        </div>
      </div>
    );
  }
);

export default ProfileSettings;
