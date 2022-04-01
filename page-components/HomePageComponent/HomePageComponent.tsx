import cn from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { Card, Htag, P } from "../../components";
import { firstLevelMenu } from "../../helpers/helpers";
import styles from "./HomePageComponent.module.css";
import { HomePageComponentProps } from "./HomePageComponent.props";

const HomePageComponent = ({
  menu,
  className,
  ...props
}: HomePageComponentProps): JSX.Element => {
  const router = useRouter();

  const handleClick = (route: string): void => {
    router.push(`/${route}`);
  };

  return (
    <div className={cn(styles.homePage, className)} {...props}>
      <div>
        <Htag className={styles.title} tag="h1">
          Обучайся с нами!
        </Htag>
        <P>
          Подборки лучших курсов, сервисов, книг и рейтинги, основанные на
          реальных отзывах.
        </P>
        <div className={styles.categories}>
          {firstLevelMenu.map((c) => (
            <Card
              tabIndex={0}
              key={c.id}
              className={styles.category}
              onClick={(): void => handleClick(c.route)}
            >
              <div className={styles.icon}>{c.icon}</div>
              <P className={styles.description}>{c.name}</P>
            </Card>
          ))}
        </div>
      </div>
      <img src={process.env.NEXT_PUBLIC_DOMAIN + "/promo.png"} alt="" />
    </div>
  );
};

export default HomePageComponent;
