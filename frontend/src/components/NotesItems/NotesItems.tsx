import { INotesItems } from "./NotesItems.props";
import NotesItem from "./NotesItem/NotesItem";
import styles from "./NotesItems.module.scss";
import cn from "classnames";
import { useMemo, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { v4 } from "uuid";
import MenuSelectIcon from "./../../../public/icons/menu-select.svg";
import AddNoteItem from "./AddNoteItem/AddNoteItem";
import { useSibebarStore } from "../../store/sidebar.store";
import NoteSidebar from "../NoteSidebar/NoteSidebar";

export default function NotesItems({
  name,
  className,
  icon,
  iconColor,
  notes,
  ...props
}: INotesItems) {
  const [visibleItem, setVisibleItem] = useState(false);
  const sidebarStore = useSibebarStore();

  const id = useMemo(() => v4(), []);
  const { setNodeRef, isOver, over } = useDroppable({
    id: id,
  });

  return (
    <div
      className={cn(styles["notes-items"], className, {})}
      {...props}
      ref={setNodeRef}
    >
      <div className={styles["notes-items__head"]}>
        <div className={styles["name"]}>
          <div className={styles["img"]}>
            <div
              className={styles["icon-color"]}
              style={{
                background: iconColor,
                boxShadow: `0px 2px 4px 0px ${iconColor}`,
              }}
            ></div>
          </div>
          <p>{name}</p>
        </div>
        <div className={styles["actions"]}>
          <div
            className={cn(styles["actions__item"], styles["eye"])}
            onClick={() => setVisibleItem((state) => !state)}
          >
            <img
              src={!visibleItem ? "./icons/eye.svg" : "./icons/close-eye.svg"}
              alt=""
            />
          </div>
          <div className={cn(styles["actions__item"])}>
            <MenuSelectIcon />
          </div>
        </div>
      </div>
      <div
        className={cn(styles["notes-items__wrapper"], {
          [styles["visible-items"]]: visibleItem,
        })}
      >
        {notes && notes.map((el) => <NotesItem key={el.id} note={el} />)}
        <AddNoteItem
          typeButton="note"
          onClick={() => sidebarStore.openSidebar(<NoteSidebar />)}
        />
      </div>
    </div>
  );
}
