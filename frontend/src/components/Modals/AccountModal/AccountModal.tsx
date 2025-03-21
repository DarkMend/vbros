import { useUserStore } from "../../../store/userStore";
import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import ModalLayout from "../../ModalLayout/ModalLayout";
import AccountIcon from "./../../../../public/icons/account.svg";
import AccountUserIcon from "./../../../../public/icons/account-user.svg";
import styles from "./AccountModal.module.scss";
import AccountModalItem from "./AccountModalItem/AccountModalItem";
import AccountMailIcon from "./../../../../public/icons/mail.svg";
import ModalButton from "../../ModalButton/ModalButton";
import ExitIcon from "./../../../../public/icons/exit.svg";
import { useLogoutUser } from "../../../utils/hooks/User/useLogoutUser";
import ImagePlus from "./../../../../public/icons/image-plus.svg";

export default function AccountModal() {
  const { user } = useUserStore();

  const { logout, isPending } = useLogoutUser();

  const changeAvatar = () => {};

  return (
    <ModalLayout icon={<AccountIcon />} title="Аккаунт">
      <div className={styles["account"]}>
        <div className={styles["account__head"]}>
          <div className={styles["avatar"]}>
            <div className={styles["avatar-plus"]}>
              <label htmlFor="avatar">
                <ImagePlus />
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                style={{ display: "none" }}
                onChange={changeAvatar}
              />
            </div>
            {user?.avatar == null ? (
              <AvatarPlug name={user?.name} />
            ) : (
              <img src={user.avatar} alt="" />
            )}
          </div>
          <div className={styles["name"]}>{user?.name}</div>
        </div>
        <div className={styles["hr"]}></div>
        <div className={styles["account__wrapper"]}>
          <AccountModalItem
            icon={<AccountUserIcon />}
            name="Имя пользователя"
            content={user?.name}
          />
          <AccountModalItem
            icon={<AccountMailIcon />}
            name="Почта"
            content={user?.email}
          />
        </div>
        <div className={styles["hr"]}></div>
        <ModalButton icon={<ExitIcon />} isLoading={isPending} onClick={logout}>
          Выйти
        </ModalButton>
      </div>
    </ModalLayout>
  );
}
