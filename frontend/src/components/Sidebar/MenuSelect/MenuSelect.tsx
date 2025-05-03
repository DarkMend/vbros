import { ReactNode } from "react";
import styles from "./MenuSelect.module.scss";
import PlusIcon from "./../../../../public/icons/plus.svg";
import TeamProjectIcon from "./../../../../public/icons/team-project.svg";

export interface IMenuSelect {
  name: string;
  icon: ReactNode;
}

export default function MenuSelect({ name, icon }: IMenuSelect) {
  return (
    <div className={styles.menuSelect}>
      <div className={styles.menuSelectMain}>
        <div className={styles.menuSelectMainInfo}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.text}>{name}</div>
        </div>
        <div className={styles.menuSelectMainActions}>
          <div className={styles.action}>
            <PlusIcon />
          </div>
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
