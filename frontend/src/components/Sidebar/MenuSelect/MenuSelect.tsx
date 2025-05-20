import { ReactNode } from "react";
import styles from "./MenuSelect.module.scss";
import PlusIcon from "./../../../../public/icons/plus.svg";
import TeamProjectIcon from "./../../../../public/icons/team-project.svg";
import { useModalStore } from "../../../store/modalStore";
import CreateOrUpdateProjectModal from "../../Modals/ProjectModal/CreateOrUpdateProjectModal/CreateOrUpdateProjectModal";
import { IProject } from "../../../interfaces/project.interface";
import SkeletonItem from "../../SkeletonItem/SkeletonItem";
import { NavLink } from "react-router-dom";
import cn from "classnames";

export interface IMenuSelect {
  name: string;
  icon: ReactNode;
  projects: IProject[];
  isFetching: boolean;
}

export default function MenuSelect({
  name,
  icon,
  projects,
  isFetching,
}: IMenuSelect) {
  const { openModal } = useModalStore();

  return (
    <div className={styles.menuSelect}>
      {isFetching ? (
        <SkeletonItem
          count={1}
          className={styles.skeleton}
          classNameContainer={styles.skeletonWrapper}
        />
      ) : (
        <div className={styles.menuSelectMain}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
          <div className={styles.menuSelectMainActions}>
            <button
              className={styles.action}
              onClick={() => openModal(<CreateOrUpdateProjectModal />)}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      )}
      <div className={styles.menuSelectItems}>
        {!isFetching &&
          projects?.map((project: IProject) => {
            return (
              <NavLink to={`/projects/${project.id}`} key={project.id}>
                {({ isActive }) => (
                  <div
                    className={cn(styles.menuSelectItem, {
                      [styles.active]: isActive,
                    })}
                  >
                    <div className={styles.menuSelectMainInfo}>
                      <div>
                        <div className={styles.icon}>
                          {project.icon ? (
                            <img
                              src={project.icon as string}
                              alt={project.name}
                            />
                          ) : (
                            <TeamProjectIcon />
                          )}
                        </div>
                      </div>
                      <div className={styles.text}>{project.name}</div>
                    </div>
                  </div>
                )}
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}
