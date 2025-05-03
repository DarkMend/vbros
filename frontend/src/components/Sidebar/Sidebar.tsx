import MenuItem from "./MenuItem/MenuItem";
import MenuSelect from "./MenuSelect/MenuSelect";
import Profile from "./Profile/Profile";
import styles from "./Sidebar.module.scss";
import { menu } from "./data";
import TeamWorksIcon from "./../../../public/icons/team-works.svg";

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
            <div className={styles["menu__wrapper"]}>
              {menu
                .filter((item) => item.href !== "/favourite")
                .map((item) => (
                  <MenuItem
                    key={item.name}
                    href={item.href}
                    name={item.name}
                    icon={item.icon}
                    teamProject={item.href == "/team-project"}
                  />
                ))}
              <MenuSelect name="Проекты" icon={<TeamWorksIcon />} />
            </div>
            <div className={styles["line"]}></div>
            <div className={styles["menu__wrapper"]}>
              {menu
                .filter((item) => item.href == "/favourite")
                .map((item) => (
                  <MenuItem
                    key={item.name}
                    href={item.href}
                    name={item.name}
                    icon={item.icon}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className={styles["profile__wrapper"]}>
          <Profile />
        </div>
      </div>
    </>
  );
}
