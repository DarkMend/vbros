import { MouseEventHandler, ReactNode } from "react";
import styles from "./ModalMenuItem.module.scss";
import { EditIcon } from "lucide-react";
import cn from "classnames";
import ColorPickerItem from "./ColorPickerItem/ColorPickerItem";
import ColorSquare from "../ColorSquare/ColorSquare";

export default function ModalMenuItem({
  icon,
  name,
  content,
  clickContent,
  edit = false,
  nameHover = true,
  overflowHidden = true,
  colorPicker = false,
  color,
  setColor,
}: {
  icon?: ReactNode;
  nameHover?: boolean;
  name: string;
  content?: ReactNode;
  clickContent?: MouseEventHandler;
  edit?: boolean;
  overflowHidden?: boolean;
  colorPicker?: boolean;
  color?: string;
  setColor?: (color: string) => void;
}) {
  return (
    <div className={styles["list-item"]}>
      <div className={styles["list-item__name"]}>
        <div
          className={cn(styles["list-item__name-hover"], {
            [styles.active]: nameHover,
          })}
        >
          {name}
        </div>
        {icon && <div className={styles["icon"]}>{icon}</div>}
        <p>{name}</p>
      </div>
      <div className={styles["list-item__wrapper"]}>
        <div
          className={cn(styles["edit"], {
            [styles["active"]]: edit,
          })}
          onClick={clickContent}
        >
          <EditIcon />
        </div>
        <div
          className={styles["list-item__content"]}
          style={{ overflow: overflowHidden ? "hidden" : "visible" }}
        >
          {colorPicker ? (
            <ColorPickerItem color={color} setColor={setColor} />
          ) : (
            <div className={styles.listItemWrapper}>
              <ColorSquare color={color} />
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
