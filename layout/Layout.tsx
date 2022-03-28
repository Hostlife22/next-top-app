import React, { FunctionComponent } from "react";
import { Up } from "../components";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import styles from "./Layout.module.css";
import { LayoutProps } from "./Layout.props";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
