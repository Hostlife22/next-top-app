import { useState } from "react";
import { Button, Htag, P, Raiting, Tag } from "../components";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h2">Заголовок</Htag>
      <Button appearance="primary" arrow="down">
        Кнопка
      </Button>
      <Button appearance="ghost" arrow="right">
        Кнопка
      </Button>
      <P size="l">Большой</P>
      <P size="m">Средний</P>
      <P size="s">Маленький</P>
      <Tag size="s">Маленький</Tag>
      <Tag size="m" color="red">
        Red
      </Tag>
      <Tag size="m" color="green">
        green
      </Tag>
      <Tag color="primary">primary</Tag>
      <Raiting rating={rating} setRating={setRating} isEditable />
    </>
  );
}

export default withLayout(Home);
