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
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../../services/user.service";
import { removeToken } from "../../../utils/helpers/removeToken";
import { useModalStore } from "../../../store/modalStore";

export default function AccountModal() {
  const { user, deleteUser } = useUserStore();
  const {closeModal} = useModalStore();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => userService.logout(),
    onSuccess() {
      deleteUser();
      removeToken();
      navigate("/auth/start");
      closeModal();
    },
  });

  const logout = async () => {
    mutate();
  };

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
        <ModalButton icon={<ExitIcon />} isLoading={isPending} onClick={logout}>
          Выйти
        </ModalButton>
      </div>
    </ModalLayout>
  );
}
