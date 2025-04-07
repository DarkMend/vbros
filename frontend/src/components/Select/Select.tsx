import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import cn from "classnames";

export default function SelectMain() {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("Сюда");

  return (
    <Select.Root
      open={active}
      onOpenChange={setActive}
      value={value}
      onValueChange={setValue}
    >
      <Select.Trigger className={styles.selectTrigger}>
        <Select.Value placeholder="Выберите статус" />
        <Select.SelectIcon
          className={cn(styles.selectIcon, {
            [styles.active]: active,
          })}
        >
          <ChevronDown />
        </Select.SelectIcon>
      </Select.Trigger>
      <AnimatePresence>
        {active && (
          <Select.Content
            position="popper"
            align="center"
            className={styles.content}
            style={{ width: `var(--radix-select-trigger-width)` }}
            sideOffset={5}
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Select.Item value="apple" className={styles.selectItem}>
                <Select.ItemText>Яблоко</Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="banana" className={styles.selectItem}>
                <Select.ItemText>Банан</Select.ItemText>
              </Select.Item>
            </motion.div>
          </Select.Content>
        )}
      </AnimatePresence>
    </Select.Root>
  );
}
