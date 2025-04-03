import { forwardRef } from "react";
import styles from "./ColorSquare.module.scss";

const ColorSquare = forwardRef<HTMLDivElement, { color?: string }>(
  ({ color }, ref) => {
    return (
      <div
        ref={ref}
        className={styles.square}
        style={{
          background: color,
          boxShadow: `0px 2px 4px 0px ${
            color === "#ffffff" ? "#b3b3b3" : color
          }`,
        }}
      ></div>
    );
  }
);

export default ColorSquare;
