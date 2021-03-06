import axios from "axios";
import cn from "classnames";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Raiting, Textarea } from "..";
import { API } from "../../helpers/api";
import CloseIcon from "./close.svg";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";

export const ReviewForm = ({
  productId,
  isOppend,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm): Promise<void> => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("Что-то пошло не так");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(error));
      }
    }
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
          tabIndex={isOppend ? 0 : -1}
          aria-invalid={errors.name ? "true" : "false"}
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
          tabIndex={isOppend ? 0 : -1}
          aria-invalid={errors.title ? "true" : "false"}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }): JSX.Element => (
              <Raiting
                isEditable
                rating={field.value}
                ref={field.ref}
                error={errors.rating}
                setRating={field.onChange}
                tabIndex={isOppend ? 0 : -1}
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
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? "true" : "false"}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOppend ? 0 : -1}
            onClick={(): void => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен </div>
          <div>Спасибо, ваш отзыв будет опубликован после поверки.</div>
          <button
            onClick={(): void => setIsSuccess(false)}
            className={styles.close}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          Что-то пошло не так, попробуйте обновить страницу
          <button
            onClick={(): void => setError(undefined)}
            className={styles.close}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
