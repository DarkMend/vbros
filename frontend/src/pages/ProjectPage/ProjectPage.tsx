import { useParams } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";
import { IProject } from "../../interfaces/project.interface";
import ProjectIcon from "../../../public/icons/team-project.svg";
import MenuSelect from "../../../public/icons/menu-select.svg";
import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../../components/AvatarPlug/AvatarPlug";
import SkeletonItem from "../../components/SkeletonItem/SkeletonItem";

type ProjectPageParams = {
  id: string;
};

export default function ProjectPage() {
  const { id } = useParams<ProjectPageParams>();
  const projectId = id ? parseInt(id) : NaN;
  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => {
      if (isNaN(projectId)) {
        throw new Error("Invalid project ID");
      }

      return projectService.getProject(projectId);
    },
    select: (data) => data.data.data,
  });

  const project: IProject = data?.project ?? {};
  const users = data?.users ?? [];
  const visibleUsers = users.slice(0, 3);

  return (
    <div className={styles.project}>
      {isLoading ? (
        <SkeletonItem className={styles.headerSkeleton} />
      ) : (
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.img}>
              {project?.icon ? (
                <img src={project?.icon as string} alt={project.name} />
              ) : (
                <ProjectIcon />
              )}
            </div>
            <div className={styles.text}>{project.name}</div>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.usersProject}>
              {visibleUsers?.map((user: IUserWithRole, index: number) => (
                <div
                  className={styles.usersProjectAva}
                  key={user.id}
                  style={{
                    zIndex: 2 - index,
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <AvatarPlug name={user.name} />
                  )}
                </div>
              ))}
              {users.length > 3 && (
                <div className={styles.count}>+{users.length - 2}</div>
              )}
            </div>
            <button className={styles.actions}>
              <MenuSelect />
            </button>
          </div>
        </div>
      )}
      <div className={styles.projectDesc}>{project.description}</div>
      <p>Заметки</p>
    </div>
  );
}
