import { Popover } from "radix-ui";
import { forwardRef, ReactNode, useState } from "react";
import styles from "./PopoverLayout.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export interface IPopoverLayout {
  content: ReactNode;
  buttonTrigger: ReactNode;
  isCloseButton?: boolean;
}

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

const PopoverLayout = forwardRef<HTMLButtonElement, IPopoverLayout>(
  ({ content, buttonTrigger, isCloseButton = true }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover.Root open={open} onOpenChange={() => setOpen((state) => !state)}>
        <Popover.Trigger asChild ref={ref}>
          {buttonTrigger}
        </Popover.Trigger>
        <AnimatePresence>
          {open && (
            <Popover.Portal forceMount>
              <Popover.Content
                style={{
                  zIndex: isCloseButton ? "10" : "2",
                  padding: isCloseButton ? "15px" : "12px",
                  paddingTop: isCloseButton ? "30px" : "",
                }}
                className={styles.content}
                sideOffset={10}
                asChild
              >
                <motion.div
                  key="popover-animation"
                  variants={animationVariants}
                  exit="exit"
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.2 }}
                >
                  {isCloseButton && (
                    <Popover.Close className={styles.close}>
                      <X />
                    </Popover.Close>
                  )}

                  {content}
                  <Popover.Arrow style={{ fill: "white" }} />
                </motion.div>
              </Popover.Content>
            </Popover.Portal>
          )}
        </AnimatePresence>
      </Popover.Root>
    );
  }
);

export default PopoverLayout;
