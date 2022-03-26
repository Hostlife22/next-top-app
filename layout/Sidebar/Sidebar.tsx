import cn from "classnames";
import React from "react";
import Logo from "../logo.svg";
import { Menu } from "../Menu/Menu";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu />
    </div>
  );
};
