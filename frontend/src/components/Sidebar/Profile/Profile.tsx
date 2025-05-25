import ProfileIconButton from "../../ProfileIconButton/ProfileIconButton";
import styles from "./Profile.module.scss";
import MenuSelectIcon from "./../../../../public/icons/menu-select.svg";
import { useUserStore } from "../../../store/userStore";
import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import DropdownMenuLayout from "../../DropdownMenuLayout/DropdownMenuLayout";
import ProfileSettingsItem from "./ProfileSettings/ProfileSettingsItem/ProfileSettingsItem";
import AccountModal from "../../Modals/AccountModal/AccountModal";
import { useLogoutUser } from "../../../utils/hooks/User/useLogoutUser";
import AccountIcon from "./../../../../public/icons/account.svg";
import GearIcon from "./../../../../public/icons/gear.svg";
import SupportIcon from "./../../../../public/icons/support.svg";
import ExitIcon from "./../../../../public/icons/exit.svg";
import { useModalStore } from "../../../store/modalStore";
import DropdownMenuItem from "../../DropdownMenuLayout/DropdownMenuItem";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const { openModal } = useModalStore();

  const { logout, isPending } = useLogoutUser();

  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__user"]}>
          <div className={styles["ava"]}>
            {user?.avatar == null ? (
              <AvatarPlug name={user?.name} />
            ) : (
              <img src={user?.avatar} alt="" />
            )}
          </div>
          <div className={styles["nameWrapper"]}>
            {/* <div className={styles['name__href']}>{user?.name}</div> */}
            <div className={styles["name"]}>{user?.name}</div>
          </div>
        </div>
        <div className={styles["arrow"]}>
          <DropdownMenuLayout
            buttonTrigger={
              <ProfileIconButton>
                <MenuSelectIcon />
              </ProfileIconButton>
            }
            className={styles.dropdown}
            content={
              <div className={styles.dropdownWrapper}>
                <div className={styles["profile-settings__wrapper"]}>
                  <DropdownMenuItem>
                    <ProfileSettingsItem
                      name="Аккаунт"
                      onClick={() => openModal(<AccountModal />)}
                      icon={<AccountIcon />}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ProfileSettingsItem name="Настройки" icon={<GearIcon />} />
                  </DropdownMenuItem>
                </div>
                <div className={styles["hr"]}></div>
                <div className={styles["profile-settings__wrapper"]}>
                  <DropdownMenuItem>
                    <ProfileSettingsItem
                      name="Поддержка"
                      icon={<SupportIcon />}
                    />
                  </DropdownMenuItem>
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
            }
          />
        </div>
      </div>
    </>
  );
}
