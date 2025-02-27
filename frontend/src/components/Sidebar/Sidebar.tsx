import MenuItem from "./MenuItem/MenuItem";
import Profile from "./Profile/Profile";
import styles from "./Sidebar.module.scss";
import { menu } from "./data";

export default function Sidebar() {
  return (
    <>
      <div className={styles["genjutsu"]}></div>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar__nav"]}>
          <div className={styles["logo"]}>
            <div className={styles["img"]}>
              <img src="./logo.svg" alt="" />
            </div>
            <h2>Вброс</h2>
          </div>
          <div className={styles["menu"]}>
            {menu.map((item) => (
              <MenuItem
                key={item.name}
                href={item.href}
                name={item.name}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className={styles["profile__wrapper"]}>
          <Profile />
        </div>
      </div>
    </>
  );
}
