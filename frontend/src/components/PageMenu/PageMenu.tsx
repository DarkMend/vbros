import PopoverLayout from "../Popover/PopoverLayout";
import MenuSelectIcon from "../../../public/icons/menu-select.svg";
import styles from "./PageMenu.module.scss";

import { ReactNode } from "react";

export interface IPageMenu {
  children: ReactNode;
}

export default function PageMenu({ children }: IPageMenu) {
  return (
    <PopoverLayout
      buttonTrigger={
        <button className={styles.actions}>
          <MenuSelectIcon />
        </button>
      }
      isCloseButton={false}
      content={children}
    />
  );
}
