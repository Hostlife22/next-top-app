import cn from "classnames";
import Link from "next/link";
import React from "react";
import { Card, Htag } from "../../components";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import styles from "./CategoryPage.module.css";
import { CategoryPageProps } from "./CategoryPage.props";

const CategoryPage = ({
  menu,
  params,
  className,
  ...props
}: CategoryPageProps): JSX.Element => {
  const route = params.type;

  const myCategory = firstLevelMenu.find((c) => c.route === route);

  const seconCategory = (category: MenuItem): JSX.Element => {
    return (
      <>
        {category.pages.map((c) => (
          <Link key={c._id} href={`/${route}/${c.alias}`}>
            <a tabIndex={0} className={cn(styles.category)}>
              {c.category}
            </a>
          </Link>
        ))}
      </>
    );
  };

  return (
    <>
      {myCategory && (
        <div className={styles.head}>
          <div className={styles.img}>{myCategory.icon}</div>
          <Htag tag="h1">{myCategory.name}</Htag>
        </div>
      )}
      <div className={cn(styles.categories, className)} {...props}>
        {menu &&
          menu.map((c) => (
            <Card key={c._id.secondCategory} className={styles.card}>
              <Htag tag="h3">{c._id.secondCategory}</Htag>
              {seconCategory(c)}
            </Card>
          ))}
      </div>
    </>
  );
};

export default CategoryPage;
