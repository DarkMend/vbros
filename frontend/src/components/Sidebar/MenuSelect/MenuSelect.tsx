import { ReactNode } from "react";
import styles from "./MenuSelect.module.scss";
import PlusIcon from "./../../../../public/icons/plus.svg";
import TeamProjectIcon from "./../../../../public/icons/team-project.svg";
import { useModalStore } from "../../../store/modalStore";
import CreateOrUpdateProjectModal from "../../Modals/ProjectModal/CreateOrUpdateProjectModal/CreateOrUpdateProjectModal";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../../services/project.service";
import { IProject } from "../../../interfaces/project.interface";
import SkeletonItem from "../../SkeletonItem/SkeletonItem";

export interface IMenuSelect {
  name: string;
  icon: ReactNode;
}

export default function MenuSelect({ name, icon }: IMenuSelect) {
  const { openModal } = useModalStore();
  const { data, isFetching } = useQuery({
    queryKey: ["getProjects"],
    queryFn: () => projectService.getProjects(),
    select: (data) => data.data.data,
  });

  return (
    <div className={styles.menuSelect}>
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
      <div className={styles.menuSelectItems}>
        {isFetching ? (
          <SkeletonItem
            count={2}
            className={styles.skeleton}
            classNameContainer={styles.skeletonWrapper}
          />
        ) : (
          data?.map((project: IProject) => {
            return (
              <div className={styles.menuSelectItem} key={project.id}>
                <div className={styles.menuSelectMainInfo}>
                  <div>
                    <div className={styles.icon}>
                      {project.icon ? (
                        <img src={project.icon as string} alt={project.name} />
                      ) : (
                        <TeamProjectIcon />
                      )}
                    </div>
                  </div>
                  <div className={styles.text}>{project.name}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
