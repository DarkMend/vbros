import { useParams } from "react-router-dom";
import styles from "./ProjectPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "../../services/project.service";
import { IProject } from "../../interfaces/project.interface";
import ProjectIcon from "../../../public/icons/team-project.svg";
import MenuSelect from "../../../public/icons/menu-select.svg";
import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../../components/AvatarPlug/AvatarPlug";

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

  return (
    <div className={styles.project}>
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
            {users?.map((user: IUserWithRole) =>
              user.avatar ? (
                <div className={styles.usersProjectAva}>
                  <img src={user.avatar} alt="" />
                </div>
              ) : (
                <div className={styles.usersProjectAva}>
                  <AvatarPlug name={user.name} />
                </div>
              )
            )}
          </div>
          <button className={styles.actions}>
            <MenuSelect />
          </button>
        </div>
      </div>
    </div>
  );
}
