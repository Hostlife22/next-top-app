import cn from "classnames";
import React from "react";
import styles from "./P.module.css";
import { PProps } from "./P.props";

export const P = ({
  children,
  size,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size === "s",
        [styles.m]: size === "m",
        [styles.l]: size === "l",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
