import { ButtonHTMLAttributes } from "react";
import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import styles from "./SelectUser.module.scss";

export interface ISelectButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  user: IUserWithRole;
  color?: string;
  isProjectUser?: boolean;
}

export default function SelectButton({
  user,
  color,
  isProjectUser,
  ...props
}: ISelectButton) {
  return (
    <button
      className={styles.selectTrigger}
      style={{
        background: color ? `${color}1A` : isProjectUser ? "" : "#6363631a",
      }}
      {...props}
    >
      <div className={styles.triggerButton}>
        {user ? (
          <div className={styles.triggerContent}>
            <div>
              <div className={styles.avatar}>
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <AvatarPlug name={user.name} />
                )}
              </div>
            </div>
            <p>{user.name}</p>
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
      </div>
    </button>
  );
}
