import { AnimatePresence, motion } from "motion/react";
import { DropdownMenu } from "radix-ui";
import { forwardRef, ReactNode, useState } from "react";
import styles from "./DropdownMenuLayout.module.scss";
import cn from "classnames";

export interface IDropdownMenuLayout {
  content: ReactNode;
  buttonTrigger: ReactNode;
  isPageMenu?: boolean;
  className?: string;
}

const DropdownMenuLayout = forwardRef<HTMLButtonElement, IDropdownMenuLayout>(
  ({ buttonTrigger, content, isPageMenu = false, className }, ref) => {
    const [open, setOpen] = useState(false);

    const animationVariants = {
      hidden: {
        opacity: 0,
        transform: isPageMenu ? "translate(-10px, -15px)" : "translateY(-15px)",
      },

      visible: {
        opacity: 1,
        transform: isPageMenu ? "translate(-10px, 0)" : "translateY(0)",
      },

      exit: {
        opacity: 0,
        transform: isPageMenu ? "translate(-10px, -15px)" : "translateY(-15px)",
      },
    };

    return (
      <DropdownMenu.Root
        open={open}
        onOpenChange={() => setOpen((state) => !state)}
      >
        <DropdownMenu.Trigger asChild ref={ref}>
          {buttonTrigger}
        </DropdownMenu.Trigger>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Portal forceMount>
              <DropdownMenu.Content
                className={cn(styles.content, className)}
                sideOffset={20}
                alignOffset={isPageMenu ? -15 : 0}
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
                  {content}
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          )}
        </AnimatePresence>
      </DropdownMenu.Root>
    );
  }
);

export default DropdownMenuLayout;
