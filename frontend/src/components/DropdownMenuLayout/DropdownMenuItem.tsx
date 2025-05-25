import { ReactNode } from "react";
import styles from "./DropdownMenuLayout.module.scss";
import { DropdownMenu } from "radix-ui";

export default function DropdownMenuItem({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DropdownMenu.Item className={styles.dropdownMenuItem}>
      {children}
    </DropdownMenu.Item>
  );
}
