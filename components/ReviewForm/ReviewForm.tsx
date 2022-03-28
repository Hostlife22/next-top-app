import cn from "classnames";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Raiting, Textarea } from "..";
import CloseIcon from "./close.svg";
import { IReviewForm } from "./ReviewForm.interface";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
        />
        <Input
          {...register("title", {
            required: {
              value: true,
              message: "Заполните заголовок",
            },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Raiting
                isEditable
                rating={field.value}
                ref={field.ref}
                error={errors.rating}
                setRating={field.onChange}
              />
            )}
          ></Controller>
        </div>
        <Textarea
          {...register("description", {
            required: {
              value: true,
              message: "Заполните описание",
            },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен </div>
        <div>Спасибо, ваш отзыв будет опубликован после поверки.</div>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  );
};
