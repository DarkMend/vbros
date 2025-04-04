import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import cn from "classnames";
import { useModalStore } from "../../store/modalStore";
import { AnimatePresence, motion } from "motion/react";

export default function Modal() {
  const { isOpen, content, closeModal, isContentOpen } = useModalStore();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(styles["modal"])}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key="modal-animate"
        >
          <AnimatePresence>
            {isContentOpen && (
              <motion.div
                key="content-animate"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, default: { type: "spring" } }}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
