import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import ModalLayout from "../../ModalLayout/ModalLayout";
import AccountIcon from "./../../../../public/icons/account.svg";
import AccountUserIcon from "./../../../../public/icons/account-user.svg";
import styles from "./AccountModal.module.scss";
import ModalMenuItem from "../../ModalMenuItem/ModalMenuItem";
import AccountMailIcon from "./../../../../public/icons/mail.svg";
import ModalButton from "../../ModalButton/ModalButton";
import ExitIcon from "./../../../../public/icons/exit.svg";
import { useLogoutUser } from "../../../utils/hooks/User/useLogoutUser";
import ImagePlus from "./../../../../public/icons/image-plus.svg";
import { ChangeEvent, useState } from "react";
import { useChangeAvatarUser } from "../../../utils/hooks/User/useChangeAvatarUser";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/user.service";
import { useModalStore } from "../../../store/modalStore";
import ChangeNameModal from "../ChangeNameModal/ChangeNameModal";

export default function AccountModal() {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.infoUser(),
  });
  const {openModal} = useModalStore();

  const { logout, isPending } = useLogoutUser();

  const { mutate, isPending: isPendingAvatar } = useChangeAvatarUser({
    onSuccess() {
      toast.success("Изображение успешно изменено");
      setIsLoadingAvatar(true);
      refetch().finally(() => {
        setIsLoadingAvatar(false);
      });
    },
    onError(data) {
      toast.error(data.response?.data?.message);
    },
  });

  const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0] || null;
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      console.log(formData.get("avatar"));
      mutate(formData);
    }
  };

  const openChangeName = () => {
    openModal(<ChangeNameModal />); 
  }

  return (
    <ModalLayout icon={<AccountIcon />} title="Аккаунт">
      <div className={styles["account"]}>
        <div className={styles["account__head"]}>
          <div className={styles["avatar"]}>
            <div className={styles["avatar-plus"]}>
              <label htmlFor="avatar">
                <div className={styles["avatar-plus__icon"]}>
                  <ImagePlus />
                </div>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                style={{ display: "none" }}
                onChange={changeAvatar}
                disabled={isPendingAvatar && true}
              />
            </div>
            {isPendingAvatar || isLoadingAvatar ? (
              <div className={styles["loader"]}>
                <Loader />
              </div>
            ) : data?.avatar == null ? (
              <AvatarPlug name={data?.name} />
            ) : (
              <img src={data?.avatar} alt="" />
            )}
          </div>
          <div className={styles["name"]}>{data?.name}</div>
        </div>
        <div className={styles["hr"]}></div>
        <div className={styles["account__wrapper"]}>
          <ModalMenuItem
            icon={<AccountUserIcon />}
            name="Имя пользователя"
            content={data?.name}
            clickContent={openChangeName}
            edit={true}
          />
          <ModalMenuItem
            icon={<AccountMailIcon />}
            name="Почта"
            content={data?.email}
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
