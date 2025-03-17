import { useEffect, useRef, useState } from "react";
import ProfileIconButton from "../../ProfileIconButton/ProfileIconButton";
import styles from "./Profile.module.scss";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import MenuSelectIcon from "./../../../../public/icons/menu-select.svg";
import { useUserStore } from "../../../store/userStore";

export default function Profile() {
  const [isActive, setIsActive] = useState(false);
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const profileIconButtonRef = useRef<HTMLButtonElement>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileIconButtonRef.current &&
        profileIconButtonRef.current.contains(e.target as Node)
      ) {
        return;
      }

      if (
        profileSettingsRef.current &&
        !profileSettingsRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileSettingsRef]);

  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__user"]}>
          <div className={styles["ava"]}>
            <img src={user?.avatar} alt="" />
          </div>
          <div className={styles["name"]}>{user?.name}</div>
        </div>
        <div className={styles["arrow"]}>
          <ProfileIconButton
            onClick={() => setIsActive((state) => !state)}
            ref={profileIconButtonRef}
          >
            <MenuSelectIcon />
          </ProfileIconButton>
          <ProfileSettings isActive={isActive} ref={profileSettingsRef} />
        </div>
      </div>
    </>
  );
}
