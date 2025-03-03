import { useState } from "react";
import ProfileIconButton from "../../ProfileIconButton/ProfileIconButton";
import styles from "./Profile.module.scss";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

export default function Profile() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__user"]}>
          <div className={styles["ava"]}>
            <img src="./icons/circle.svg" alt="" />
          </div>
          <div className={styles["name"]}>Аяз</div>
        </div>
        <div className={styles["arrow"]}>
          <ProfileIconButton onClick={() => setIsActive((state) => !state)}>
            <img src="./icons/menu-select.svg" alt="октрыть меню" />
          </ProfileIconButton>
          <ProfileSettings isActive={isActive} />
        </div>
      </div>
    </>
  );
}
