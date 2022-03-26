import axios from "axios";
import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, Input, P, Raiting, Tag, Textarea } from "../components";
import { MenuItem } from "../interfaces/menu.interface";
import { withLayout } from "../layout/Layout";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
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
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
      <Input placeholder="test" />
      <Textarea placeholder="text area" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory,
    }
  );

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
