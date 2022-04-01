import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/app.context";
import { API } from "../../helpers/api";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { withLayout } from "../../layout/Layout";
import CategoryPage from "../../page-components/CategoryPage/CategoryPage";

function Type({ menu, params }: TypeProps): JSX.Element {
  const { setMenu } = useContext(AppContext);

  useEffect(() => {
    if (menu && setMenu) {
      setMenu(menu);
    }
  }, [menu, setMenu]);

  return <CategoryPage menu={menu} params={params} />;
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        params: params,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  params: ParsedUrlQuery;
}
