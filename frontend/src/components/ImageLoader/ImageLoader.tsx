import styles from "./ImageLoader.module.scss";
import ProjectIcon from "../../../public/icons/team-project.svg";
import { InputHTMLAttributes } from "react";
import cn from "classnames";

export interface IImageLoader extends InputHTMLAttributes<HTMLInputElement> {
  image: string | null;
  isSvg?: boolean;
}

export default function ImageLoader({ image, isSvg, ...props }: IImageLoader) {
  return (
    <div className={styles.imageLoader}>
      <div>
        <label
          htmlFor="image-loader"
          className={cn(styles.label, {
            [styles.svg]: isSvg,
          })}
        >
          <div
            className={cn(styles.img, {
              [styles.svg]: isSvg,
            })}
          >
            {image ? <img src={image} alt={image} /> : <ProjectIcon />}
          </div>
        </label>
      </div>
      <p className={styles.text}>
        Условия для загрузки иконки. Формат: .jpg, .svg, .png. Размер: не более
        6MB
      </p>
      <input
        type="file"
        id="image-loader"
        className={styles.input}
        {...props}
      />
    </div>
  );
}
