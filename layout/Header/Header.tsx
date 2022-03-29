import cn from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ButtonIcon } from "../../components";
import Logo from "../logo.svg";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Header.module.css";
import { HeaderProps } from "./Header.props";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={(): void => setIsOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        animate={isOpened ? "opened" : "closed"}
        variants={variants}
        initial="closed"
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={(): void => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
