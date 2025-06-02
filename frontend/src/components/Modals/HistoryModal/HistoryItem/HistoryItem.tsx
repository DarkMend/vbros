import styles from "./HistoryItem.module.scss";
import ProjectIcon from "../../../../../public/icons/team-project.svg";

export interface IHistoryItem {
  name: string;
  startProject: Date;
  finishProject: Date | null;
  projectIcon?: string;
}

export default function HistoryItem({
  name,
  startProject,
  finishProject,
  projectIcon,
}: IHistoryItem) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        <div>
          <div className={styles.icon}>
            {projectIcon ? <img src={projectIcon} alt="" /> : <ProjectIcon />}
          </div>
        </div>
        <div>{name}</div>
      </div>
      <div className={styles.dateWrapper}>
        <div className={styles.date}>{startProject.toLocaleDateString()}</div>
        <div className={styles.line}></div>
        <div className={styles.date}>
          {finishProject ? finishProject.toLocaleDateString() : "по н.в."}
        </div>
      </div>
    </div>
  );
}
