import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import styles from "./SelectUser.module.scss";
// import TrashIcon from "./../../../public/icons/trash.svg";
// import DropdownMenuItem from "../DropdownMenuLayout/DropdownMenuItem";

export default function SelectButton({
  value,
  color,
  isProjectUser,
}: //   onClick,
{
  value: IUserWithRole;
  color?: string;
  isProjectUser?: boolean;
  onClick?: (id: number) => void;
}) {
  //   const handleDeleteClick = (e: React.MouseEvent) => {
  //     e.stopPropagation();
  //     onClick?.(value.id as number);
  //   };
  return (
    <button
      className={styles.selectTrigger}
      style={{
        background: color ? `${color}1A` : isProjectUser ? "" : "#6363631a",
      }}
    >
      <div className={styles.triggerButton}>
        {value ? (
          <div className={styles.triggerContent}>
            <div>
              <div className={styles.avatar}>
                {value.avatar ? (
                  <img src={value.avatar} alt="" />
                ) : (
                  <AvatarPlug name={value.name} />
                )}
              </div>
            </div>
            <p>{value.name}</p>
          </div>
        ) : (
          <div className={styles.triggerContent}>
            <div>
              <div className={styles.avatar}>
                <AvatarPlug />
              </div>
            </div>
            <p>Свободная задача</p>
          </div>
        )}
        {/* {isProjectUser && value.role == "creator" && (
          <DropdownMenuItem>
            <div className={styles.deleteUser} onClick={handleDeleteClick}>
              <TrashIcon />
            </div>
          </DropdownMenuItem>
        )} */}
      </div>
    </button>
  );
}
