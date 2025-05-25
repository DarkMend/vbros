import ModalLayout from "../../ModalLayout/ModalLayout";
import CalendarIcon from "../../../../public/icons/calendar-clock.svg";
import styles from "./DateModal.module.scss";
import Calendar from "react-calendar";
import { useNoteStore } from "../../../store/noteStore";
import { useModalStore } from "../../../store/modalStore";
import ParagraphModal from "../../ParagraphModal/ParagraphModal";
import { useTaskStore } from "../../../store/taskStore";

export default function DateModal({
  isStatusProject,
}: {
  isStatusProject?: boolean;
}) {
  const { date, setDate } = useNoteStore();
  const { date: projectDate, setDate: setProjectDate } = useTaskStore();
  const { closeModal } = useModalStore();

  const changeDate = (date: Date) => {
    if (isStatusProject) {
      setProjectDate(date);
    } else {
      setDate(date);
    }
    closeModal();
  };

  return (
    <ModalLayout title="Дедлайн" icon={<CalendarIcon />}>
      <div className={styles.dateChange}>
        <ParagraphModal>
          Здесь вы можете выбрать пердварительную дату завершения
        </ParagraphModal>
        <Calendar
          onClickDay={changeDate}
          value={isStatusProject ? projectDate : date}
          locale="ru-RU"
          minDetail="year"
          next2Label={null}
          prev2Label={null}
          minDate={new Date()}
          tileClassName={({ date: day, view }) => {
            if (view === "month") {
              const classes = [];
              if (day.getDay() === 0 || day.getDay() === 6) {
                classes.push("weekend");
              }

              return classes.join(" ");
            }
            return null;
          }}
        />
      </div>
    </ModalLayout>
  );
}
