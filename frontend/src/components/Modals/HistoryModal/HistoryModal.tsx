import { History } from "lucide-react";
import ModalLayout from "../../ModalLayout/ModalLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosWithAuth } from "../../../api/interceptors";
import { IHistory } from "../../../interfaces/history.interface";
import styles from "./HistoryModal.module.scss";
import SkeletonItem from "../../SkeletonItem/SkeletonItem";
import HistoryItem from "./HistoryItem/HistoryItem";

export default function HistoryModal() {
  const { data: histories, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: () => axiosWithAuth.get("history/personal-histories"),
    select: (histories) => histories.data.data,
  });

  return (
    <ModalLayout icon={<History />} title="История проектов">
      <div className={styles.historyWrapper}>
        {isLoading ? (
          <SkeletonItem count={3} className={styles.skeleton} />
        ) : histories.length > 0 ? (
          histories
            ?.map((history: IHistory) => (
              <HistoryItem
                key={history.id}
                name={history.projectName}
                startProject={new Date(history.startProject)}
                finishProject={
                  history.finishProject ? new Date(history.finishProject) : null
                }
                projectIcon={history.projectIcon}
              />
            ))
            .reverse()
        ) : (
          <div className={styles.text}>У вас пока нет проектов в истории</div>
        )}
      </div>
    </ModalLayout>
  );
}
