import { IUserWithRole } from "../../interfaces/user.interface";
import { useModalStore } from "../../store/modalStore";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import DropdownMenuItem from "../DropdownMenuLayout/DropdownMenuItem";
import DropdownMenuLayout from "../DropdownMenuLayout/DropdownMenuLayout";
import UserAccountModal from "../Modals/UserAccountModal/UserAccountModal";
import SelectButton from "../Select/SelectButton";
import styles from "./ProjectUsers.module.scss";

export interface IProjectUsers {
  visibleUsers: IUserWithRole[];
  users: IUserWithRole[];
  projectId: number;
}

export default function ProjectUsers({
  visibleUsers,
  users,
  projectId,
}: IProjectUsers) {
  const { openModal } = useModalStore();
  const userModalInfo = (userId: number) => {
    openModal(
      <UserAccountModal projectId={projectId} projectUserId={userId} />
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
            <DropdownMenuItem key={user.id}>
              <SelectButton
                user={user}
                isProjectUser={true}
                onClick={() => userModalInfo(user.id as number)}
              />
            </DropdownMenuItem>
          ))}
        </div>
      }
    />
  );
}
