import cn from "classnames";
import React from "react";
import { TextareaProps } from "./Textarea.props";
import styles from "./TextareaProps.module.css";

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return <textarea className={cn(className, styles.input)} {...props} />;
};
