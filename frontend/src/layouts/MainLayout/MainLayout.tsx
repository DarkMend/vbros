import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import NoteSidebarLayout from "../../components/NoteSidebarLaoyut/NoteSidebarLayout";

export default function MainLayout() {
  return (
    <div className={styles["main-layout"]}>
      <Modal />
      <NoteSidebarLayout />
      <Sidebar />
      <div className={styles["page"]}>
        <Outlet />
      </div>
    </div>
  );
}
