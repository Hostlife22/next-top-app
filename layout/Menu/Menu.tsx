import cn from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useContext } from "react";
import { AppContext } from "../../context/app.context";
import { firstLevelMenu } from "../../helpers/helpers";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import styles from "./Menu.module.css";

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: { marginBottom: 0 },
  };
  const variantsChildren = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: { opacity: 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string): void => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.id}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <>
        <div className={styles.secondBlock}>
          {menu.map((m) => {
            if (
              m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
            ) {
              m.isOpened = true;
            }

            return (
              <div key={m._id.secondCategory}>
                <div
                  tabIndex={0}
                  onKeyDown={(key: KeyboardEvent) =>
                    openSecondLevelKey(key, m._id.secondCategory)
                  }
                  className={styles.secondLevel}
                  onClick={(): void => openSecondLevel(m._id.secondCategory)}
                >
                  {m._id.secondCategory}
                </div>
                <motion.div
                  variants={variants}
                  initial={m.isOpened ? "visible" : "hidden"}
                  animate={m.isOpened ? "visible" : "hidden"}
                  className={cn(styles.secondLevelBlock)}
                  layout
                >
                  {buildThirdLevel(
                    m.pages,
                    menuItem.route,
                    m.isOpened ?? false
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ): JSX.Element[] => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` === router.asPath,
            })}
          >
            {p.category}
          </a>
        </Link>
      </motion.div>
    ));
  };

  return (
    <nav className={styles.menu} role="navigation">
      {buildFirstLevel()}
    </nav>
  );
};
