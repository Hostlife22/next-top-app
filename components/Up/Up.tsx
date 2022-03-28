import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Up.module.css";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({
      opacity: y / document.body.scrollHeight,
      display: y ? "block" : "none",
    });
  }, [y, controls]);

  const scrollToTop = (): void => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className={styles.up}
    >
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
