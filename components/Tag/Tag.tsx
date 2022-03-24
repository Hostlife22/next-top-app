import cn from "classnames";
import React from "react";
import styles from "./Tag.module.css";
import { TagProps } from "./Tag.props";

export const Tag = ({
  children,
  href,
  size = "s",
  color = "ghost",
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.ghost]: color === "ghost",
        [styles.red]: color === "red",
        [styles.green]: color === "green",
        [styles.grey]: color === "grey",
        [styles.primary]: color === "primary",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
