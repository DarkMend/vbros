import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../AvatarPlug/AvatarPlug";
import styles from "./SelectUser.module.scss";

export default function SelectButton({
  value,
  color,
}: {
  value: IUserWithRole;
  color: string;
}) {
  return (
    <button
      className={styles.selectTrigger}
      style={{ background: color ? `${color}1A` : "#6363631a" }}
    >
      <div className={styles.triggerButton}>
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
      </div>
    </button>
  );
}
