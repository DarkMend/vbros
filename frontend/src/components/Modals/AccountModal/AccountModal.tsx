import { useUserStore } from "../../../store/userStore";
import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import ModalLayout from "../../ModalLayout/ModalLayout";
import AccountIcon from "./../../../../public/icons/account.svg";
import AccountUserIcon from "./../../../../public/icons/account-user.svg";
import styles from "./AccountModal.module.scss";
import AccountModalItem from "./AccountModalItem/AccountModalItem";
import AccountMailIcon from "./../../../../public/icons/mail.svg";

export default function AccountModal() {
  const { user } = useUserStore();

  return (
    <ModalLayout icon={<AccountIcon />} title="Аккаунт">
      <div className={styles["account"]}>
        <div className={styles["account__head"]}>
          <div className={styles["avatar"]}>
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
      </div>
    </ModalLayout>
  );
}
