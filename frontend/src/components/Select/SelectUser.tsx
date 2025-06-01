import { Popover } from "radix-ui";
import { ChevronDown } from "lucide-react";
import styles from "./SelectUser.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useState } from "react";
import cn from "classnames";
import { IUserWithRole } from "../../interfaces/user.interface";
import AvatarPlug from "../AvatarPlug/AvatarPlug";

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
  users?: IUserWithRole[];
  value: IUserWithRole | null;
  setValue: (value: IUserWithRole | null) => void;
  color?: string;
}

const SelectUser = forwardRef<HTMLButtonElement, ISelectIcon>(
  ({ users, value, setValue, color }, ref) => {
    const [open, setOpen] = useState(false);

    const handleChange = (item: IUserWithRole | null) => {
      setValue(item);
      setOpen(false);
    };

    return (
      <Popover.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
        <Popover.Trigger
          ref={ref}
          asChild
          className={styles.selectTrigger}
          style={{ background: color ? `${color}1A` : "#6363631a" }}
        >
          <button className={styles.triggerButton}>
            {value ? (
              <div className={styles.triggerContent}>
                <div>
                  <div className={styles.avatar}>
                    {value.avatar ? (
                      <img src={value.avatar} alt="" />
                    ) : (
                      <AvatarPlug name={value.name} />
                    )}
                  </div>
                </div>
                <p>{value.name}</p>
              </div>
            ) : (
              <div className={styles.triggerContent}>
                <div>
                  <div className={styles.avatar}>
                    <AvatarPlug />
                  </div>
                </div>
                <p>Свободная задача</p>
              </div>
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
                  <div
                    className={cn(styles.selectItem)}
                    style={
                      value == null
                        ? {
                            background: "#6363631a",
                          }
                        : undefined
                    }
                    onClick={() => handleChange(null)}
                  >
                    <div>
                      <div className={styles.avatar}>
                        <AvatarPlug />
                      </div>
                    </div>
                    <p>Свободная задача</p>
                  </div>
                  {users?.map((item) => (
                    <div
                      key={item.id}
                      className={cn(styles.selectItem)}
                      style={
                        value?.id == item.id
                          ? {
                              background: color ? `${color}1A` : "#6363631a",
                            }
                          : undefined
                      }
                      onClick={() => handleChange(item)}
                    >
                      <div>
                        <div className={styles.avatar}>
                          {item.avatar ? (
                            <img src={item.avatar} alt="" />
                          ) : (
                            <AvatarPlug name={item.name} />
                          )}
                        </div>
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

export default SelectUser;
