import { Switch } from "radix-ui";
import styles from "./SwitchItem.module.scss";

export interface ISwitchItem {
  color: string;
}

export default function SwitchItem({ color }: ISwitchItem) {
  return (
    <Switch.Root id="airplane-mode" asChild>
      <div
        className={styles.SwitchRoot}
        style={
          {
            "--switch-active-color": color,
            borderColor: color,
          } as React.CSSProperties
        }
      >
        <Switch.Thumb className={styles.SwitchThumb} />
      </div>
    </Switch.Root>
  );
}
