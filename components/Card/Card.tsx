import cn from "classnames";
import React, { ForwardedRef, forwardRef } from "react";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

export const Card = forwardRef(
  (
    { children, color = "white", className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color === "blue",
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
