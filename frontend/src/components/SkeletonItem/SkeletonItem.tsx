import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonItem.module.scss";
import { HTMLAttributes } from "react";
import cn from "classnames";

export interface ISkeletonItem extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  classNameContainer?: string;
}

export default function SkeletonItem({
  className,
  classNameContainer,
  count,
  ...props
}: ISkeletonItem) {
  return (
    <Skeleton
      className={cn(styles.skeleton, className)}
      {...props}
      count={count}
      containerClassName={classNameContainer}
    />
  );
}
