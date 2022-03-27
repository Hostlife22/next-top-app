import cn from "classnames";
import React from "react";
import styles from "./Textarea.module.css";
import { TextareaProps } from "./Textarea.props";

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return <textarea className={cn(className, styles.input)} {...props} />;
};
