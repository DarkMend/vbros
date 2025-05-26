import { IUserWithRole } from "../../interfaces/user.interface";
import { useModalStore } from "../../store/modalStore";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import DropdownMenuLayout from "../DropdownMenuLayout/DropdownMenuLayout";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";
import { useDeleteUserHook } from "../Modals/ProjectModal/CreateOrUpdateProjectModal/useDeleteProject";
import SelectButton from "../Select/SelectButton";
import styles from "./ProjectUsers.module.scss";

export interface IProjectUsers {
  visibleUsers: IUserWithRole[];
  users: IUserWithRole[];
}

export default function ProjectUsers({ visibleUsers, users }: IProjectUsers) {
  const { openModal, closeModal } = useModalStore();
  const deleteHandle = (id: number) => {
    openModal(
      <ModalConfirmation
        text="Вы точно хотите исключить данного человека?"
        backAction={closeModal}
        id={id}
        handleConfirmation={useDeleteUserHook}
      />
    );
  };

  return (
    <DropdownMenuLayout
      isPageMenu={true}
      buttonTrigger={
        <button className={styles.usersProject}>
          {visibleUsers?.map((user: IUserWithRole, index: number) => (
            <div
              className={styles.usersProjectAva}
              key={user.id}
              style={{
                zIndex: 2 - index,
              }}
            >
              {user.avatar ? (
                <img src={user.avatar} alt="" />
              ) : (
                <AvatarPlug name={user.name} />
              )}
            </div>
          ))}
          {users.length > 3 && (
            <div className={styles.count}>+{users.length - 2}</div>
          )}
        </button>
      }
      content={
        <div className={styles.users}>
          {users.map((user: IUserWithRole) => (
            <SelectButton
              value={user}
              isProjectUser={true}
              key={user.id}
              onClick={() => deleteHandle(user.id as number)}
            />
          ))}
        </div>
      }
    />
  );
}
