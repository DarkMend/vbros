import { Popover } from "radix-ui";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState } from "react";
import cn from "classnames";
import ColorSquare from "../ColorSquare/ColorSquare";
import { IStatus } from "../../interfaces/status.interface";
import { IStatusProject } from "../../interfaces/statusProject";

const animationVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(-15px)",
  },

  visible: {
    opacity: 1,
    transform: "translateY(0px)",
  },

  exit: {
    opacity: 0,
    transform: "translateY(-15px)",
  },
};

export interface ISelectIcon {
  statuses?: IStatus[] | IStatusProject[];
  value: IStatus | IStatusProject | null;
  setValue: (value: IStatus | IStatusProject) => void;
}

const Select = forwardRef<HTMLButtonElement, ISelectIcon>(
  ({ statuses, value, setValue }, ref) => {
    const [open, setOpen] = useState(false);

    const handleChange = (item: IStatus | IStatusProject) => {
      setValue(item);
      setOpen(false);
    };

    return (
      <Popover.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
        <Popover.Trigger
          ref={ref}
          asChild
          className={styles.selectTrigger}
          style={
            value
              ? { background: `${value.color}1A` }
              : { background: "#6363631a" }
          }
        >
          <button className={styles.triggerButton}>
            {value ? (
              <div className={styles.triggerContent}>
                <div>
                  <ColorSquare color={value.color} />
                </div>
                <p>{value.name}</p>
              </div>
            ) : (
              <p>Выберите статус</p>
            )}
            <div>
              <div
                className={cn(styles.selectIcon, {
                  [styles.active]: open,
                })}
              >
                <ChevronDown />
              </div>
            </div>
          </button>
        </Popover.Trigger>
        <AnimatePresence>
          {open && (
            <Popover.Portal forceMount>
              <Popover.Content
                asChild
                sideOffset={10}
                className={styles.content}
              >
                <motion.div
                  variants={animationVariants}
                  initial="hidden"
                  exit="exit"
                  animate="visible"
                >
                  {statuses?.map((item) => (
                    <div
                      key={item.id}
                      className={cn(styles.selectItem)}
                      style={
                        value?.id == item.id
                          ? {
                              background: `${item.color}1A`,
                            }
                          : undefined
                      }
                      onClick={() => handleChange(item)}
                    >
                      <div>
                        <ColorSquare color={item.color} />
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </motion.div>
              </Popover.Content>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </Popover.Root>
    );
  }
);

export default Select;
