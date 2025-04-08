import ModalLayout from "../../ModalLayout/ModalLayout";
import CalendarIcon from "../../../../public/icons/calendar-clock.svg";
import styles from "./DateModal.module.scss";
import Calendar from "react-calendar";
import { useNoteStore } from "../../../store/noteStore";
import { useModalStore } from "../../../store/modalStore";

export default function DateModal() {
  const { date, setDate } = useNoteStore();
  const { closeModal } = useModalStore();

  const changeDate = (date: Date) => {
    setDate(date);
    closeModal();
  };

  return (
    <ModalLayout title="Дедлайн" icon={<CalendarIcon />}>
      <div className={styles.dateChange}>
        <Calendar
          onClickDay={changeDate}
          value={date}
          locale="ru-RU"
          minDetail="year"
          next2Label={null}
          prev2Label={null}
          tileClassName={({ date: day, view }) => {
            if (view === "month") {
              const classes = [];
              if (day.getDay() === 0 || day.getDay() === 6) {
                classes.push(styles.weekend);
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
