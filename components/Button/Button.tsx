import cn from "classnames";
import { motion, useMotionValue } from "framer-motion";
import React from "react";
import ArrowIcon from "./arrow.svg";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";

export const Button = ({
  children,
  arrow = "none",
  appearance,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.ghost]: appearance === "ghost",
      })}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === "down",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
