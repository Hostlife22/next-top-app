import cn from "classnames";
import React from "react";
import styles from "./Diveder.module.css";
import { DivederProps } from "./Diveder.props";

export const Diveder = ({ className, ...props }: DivederProps): JSX.Element => {
  return <hr className={cn(styles.hr, className)} {...props} />;
};
