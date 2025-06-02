import MenuItem from "./MenuItem/MenuItem";
import MenuSelect from "./MenuSelect/MenuSelect";
import Profile from "./Profile/Profile";
import styles from "./Sidebar.module.scss";
import { menu } from "./data";
import TeamWorksIcon from "./../../../public/icons/team-works.svg";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";
import Logo from "../../../public/logo.svg";
import { History } from "lucide-react";
import cn from "classnames";
import { useModalStore } from "../../store/modalStore";
import HistoryModal from "../Modals/HistoryModal/HistoryModal";

export default function Sidebar() {
  const { openModal } = useModalStore();

  const { data: projects, isFetching } = useQuery({
    queryKey: ["getProjects"],
    queryFn: () => projectService.getProjects(),
    select: (projects) => projects.data.data,
  });

  return (
    <>
      <div className={styles["genjutsu"]}></div>
      <div className={styles["sidebar"]}>
        <div className={styles["sidebar__nav"]}>
          <div className={styles["logo"]}>
            <div className={styles["img"]}>
              <Logo />
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
              <MenuSelect
                name="Проекты"
                icon={<TeamWorksIcon />}
                isFetching={isFetching}
                projects={projects}
              />
            </div>
            <div className={styles["line"]}></div>
            <div className={styles["menu__wrapper"]}>
              <button
                className={cn(styles["nav"])}
                onClick={() => openModal(<HistoryModal />)}
              >
                <div className={styles["nav__main"]}>
                  <div className={styles["nav__href"]}>
                    <div className={styles["icon"]}>
                      <History />
                    </div>
                    <div className={styles["text"]}>История проектов</div>
                  </div>
                </div>
              </button>
              {/* {menu
                .filter((item) => item.href == "/favourite")
                .map((item) => (
                  <MenuItem
                    key={item.name}
                    href={item.href}
                    name={item.name}
                    icon={item.icon}
                  />
                ))} */}
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
