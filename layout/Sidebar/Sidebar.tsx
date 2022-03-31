import cn from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { Search } from "../../components";
import Logo from "../logo.svg";
import { Menu } from "../Menu/Menu";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const router = useRouter();
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} onClick={() => router.push("/")} />
      <Search />
      <Menu />
    </div>
  );
};
