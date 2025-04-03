import ColorSquare from "../../ColorSquare/ColorSquare";
import PopoverLayout from "../../Popover/PopoverLayout";
import styles from "./ColorPickerItem.module.scss";
import { HexColorPicker } from "react-colorful";

export default function ColorPickerItem({ color }: { color?: string }) {
  return (
    <>
      <div className={styles.picker}>
        <PopoverLayout
          buttonTrigger={
            <button className={styles.button}>
              <ColorSquare color={color} />
            </button>
          }
          content={<HexColorPicker />}
        />
      </div>
    </>
  );
}
