import cn from "classnames";
import React, {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import styles from "./Raiting.module.css";
import { RaitingProps } from "./Raiting.props";
import StarIcon from "./star.svg";

export const Raiting = forwardRef(
  (
    { isEditable, rating, setRating, error, className, ...props }: RaitingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      contructRating(rating);
    }, [rating]);

    const contructRating = (currentRating: number): void => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
        <span
          key={i}
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={(): void => changeDisplay(i + 1)}
          onMouseLeave={(): void => changeDisplay(rating)}
          onClick={(): void => onClick(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>): void => {
              isEditable && handleSpace(i + 1, e);
            }}
          />
        </span>
      ));
      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number): void => {
      if (!isEditable) {
        return;
      }
      contructRating(i);
    };

    const onClick = (i: number): void => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>): void => {
      if (e.code !== "Space" || !setRating) {
        return;
      }

      setRating(i);
    };
    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, className, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
