import { Switch } from "radix-ui";
import styles from "./SwitchItem.module.scss";

export interface ISwitchItem {
  color?: string;
  value: boolean;
  setValue?: (value: boolean) => void;
}

export default function SwitchItem({ color, value, setValue }: ISwitchItem) {
  const checkSwitch = () => {
    if (setValue) setValue(!value);
  };

  return (
    <Switch.Root
      id="airplane-mode"
      asChild
      checked={value}
      onClick={checkSwitch}
    >
      <div
        className={styles.SwitchRoot}
        style={
          {
            "--switch-active-color": color === "#ffffff" ? "black" : color,
            borderColor: color === "#ffffff" ? "black" : color,
          } as React.CSSProperties
        }
      >
        <Switch.Thumb className={styles.SwitchThumb} />
      </div>
    </Switch.Root>
  );
}
