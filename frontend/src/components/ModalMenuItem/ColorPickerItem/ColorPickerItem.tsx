import ColorSquare from "../../ColorSquare/ColorSquare";
import PopoverLayout from "../../Popover/PopoverLayout";
import styles from "./ColorPickerItem.module.scss";
import { HexColorPicker } from "react-colorful";

export default function ColorPickerItem({
  color,
  setColor,
}: {
  color?: string;
  setColor?: (color: string) => void;
}) {
  return (
    <>
      <div className={styles.picker}>
        <PopoverLayout
          buttonTrigger={
            <button className={styles.button}>
              <ColorSquare color={color} />
            </button>
          }
          content={<HexColorPicker color={color} onChange={setColor} />}
        />
      </div>
    </>
  );
}
