import { useEffect, useRef, useState } from "react";
import ProfileIconButton from "../../ProfileIconButton/ProfileIconButton";
import styles from "./Profile.module.scss";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

export default function Profile() {
  const [isActive, setIsActive] = useState(false);
  const profileSettingsRef = useRef<HTMLDivElement>(null);
  const profileIconButtonRef = useRef<HTMLButtonElement>(null);

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
            <img src="./icons/circle.svg" alt="" />
          </div>
          <div className={styles["name"]}>Аяз</div>
        </div>
        <div className={styles["arrow"]}>
          <ProfileIconButton
            onClick={() => setIsActive((state) => !state)}
            ref={profileIconButtonRef}
          >
            <img src="./icons/menu-select.svg" alt="открыть меню" />
          </ProfileIconButton>
          <ProfileSettings isActive={isActive} ref={profileSettingsRef} />
        </div>
      </div>
    </>
  );
}
