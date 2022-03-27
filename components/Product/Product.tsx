import cn from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Card, Diveder, Raiting, Review, ReviewForm, Tag } from "..";
import { declOfNum, priceRu } from "../../helpers/helpers";
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  const [isReviewOppend, setIsReviewOppend] = useState<boolean>(false);
  return (
    <>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <Raiting rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} color="ghost" className={styles.category}>
              {c}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount}{" "}
          {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
        </div>
        <Diveder className={styles.hr} />

        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.addTitle}>Преимущество</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.addTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Diveder className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробнее</Button>
          <Button
            appearance="ghost"
            arrow={isReviewOppend ? "down" : "right"}
            className={styles.reviewButton}
            onClick={(): void => setIsReviewOppend((prev) => !prev)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card
        color="blue"
        className={cn(styles.rewiews, {
          [styles.opened]: isReviewOppend,
          [styles.closed]: !isReviewOppend,
        })}
      >
        {product.reviews.map((r) => (
          <>
            <Review key={r._id} review={r} />
            <Diveder />
          </>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </>
  );
};