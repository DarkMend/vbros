import AvatarPlug from "../../AvatarPlug/AvatarPlug";
import ModalLayout from "../../ModalLayout/ModalLayout";
import AccountIcon from "./../../../../public/icons/account.svg";
import AccountUserIcon from "./../../../../public/icons/account-user.svg";
import styles from "./UserAccountModal.module.scss";
import ModalMenuItem from "../../ModalMenuItem/ModalMenuItem";
import AccountMailIcon from "./../../../../public/icons/mail.svg";
import ModalButton from "../../ModalButton/ModalButton";
import ExitIcon from "./../../../../public/icons/exit.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../../services/user.service";
import SeparationLine from "../../SeparationLine/SeparationLine";
import { useTaskStore } from "../../../store/taskStore";
import Loader from "../../Loader/Loader";
import { useDeleteUser } from "../../../utils/hooks/Project/useDeleteUser";
import { toast } from "react-toastify";
import { useModalStore } from "../../../store/modalStore";

export interface IUserAccountModal {
  projectUserId: number;
  projectId: number;
}

export default function UserAccountModal({
  projectUserId,
  projectId,
}: IUserAccountModal) {
  const { currentUser } = useTaskStore();
  const { closeModal } = useModalStore();

  const { data, isLoading } = useQuery({
    queryKey: ["userProject", projectUserId],
    queryFn: () => userService.infoProjectUser(projectUserId),
  });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteUser({
    onSuccess() {
      toast.success("Пользователь успешно удален");
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({
        queryKey: ["projectStatuses", projectId],
      });
      closeModal();
    },
    onError(data) {
      toast.warning(data.response?.data?.message);
    },
  });

  const deleteFunction = () => {
    mutate({ id: projectId, user_id: projectUserId });
  };

  return (
    <ModalLayout icon={<AccountIcon />} title="Пользователь">
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles["account"]}>
          <div className={styles["account__head"]}>
            <div className={styles["avatar"]}>
              {data?.avatar == null ? (
                <AvatarPlug name={data?.name} />
              ) : (
                <img src={data?.avatar} alt="" />
              )}
            </div>
            <div className={styles["name"]}>{data?.name}</div>
          </div>
          <SeparationLine />
          <div className={styles["account__wrapper"]}>
            <ModalMenuItem
              icon={<AccountUserIcon />}
              name="Имя пользователя"
              content={data?.name}
              edit={false}
            />
            <ModalMenuItem
              icon={<AccountMailIcon />}
              name="Почта"
              content={data?.email}
            />
          </div>
          {currentUser?.role == "creator" &&
            currentUser.id !== projectUserId && (
              <>
                <div className={styles["hr"]}></div>
                <ModalButton
                  icon={<ExitIcon />}
                  isLoading={isPending}
                  onClick={deleteFunction}
                  typeButton="delete"
                  deleteUser={true}
                >
                  Удалить из проекта
                </ModalButton>
              </>
            )}
        </div>
      )}
    </ModalLayout>
  );
}
