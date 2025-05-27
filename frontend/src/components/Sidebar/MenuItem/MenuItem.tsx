import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";
import { IMenuItem } from "./MenuItem.props";
import cn from "classnames";
import PlusIcon from "./../../../../public/icons/plus.svg";

export default function MenuItem({
  href,
  name,
  icon,
  teamProject,
  ...props
}: IMenuItem) {
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <div
          className={cn(styles["nav"], {
            [styles["active"]]: isActive,
          })}
          {...props}
        >
          <div className={styles["nav__main"]}>
            {/* <div className={cn(styles['arrow'], {
                            [styles['active']]: listActive,
                            [styles['none']]: arrowActive
                        })} onClick={expandList}>
                            <ArrowSvg className={styles['arrow_svg']} />
                        </div> */}
            <div className={styles["nav__href"]}>
              <div className={styles["icon"]}>{icon}</div>
              <div className={styles["text"]}>{name}</div>
            </div>
          </div>
          <button
            className={cn(styles["quantity"], {
              [styles.active]: teamProject,
            })}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <PlusIcon />
          </button>
        </div>
      )}
    </NavLink>
  );
}
