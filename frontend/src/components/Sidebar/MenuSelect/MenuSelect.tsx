import { ReactNode } from "react";
import styles from "./MenuSelect.module.scss";
import PlusIcon from "./../../../../public/icons/plus.svg";
import TeamProjectIcon from "./../../../../public/icons/team-project.svg";
import { useModalStore } from "../../../store/modalStore";
import CreateOrUpdateProjectModal from "../../Modals/ProjectModal/CreateOrUpdateProjectModal/CreateOrUpdateProjectModal";

export interface IMenuSelect {
  name: string;
  icon: ReactNode;
}

export default function MenuSelect({ name, icon }: IMenuSelect) {
  const { openModal } = useModalStore();

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
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>
              <TeamProjectIcon />
            </div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
        <div className={styles.menuSelectItem}>
          <div className={styles.menuSelectMainInfo}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
