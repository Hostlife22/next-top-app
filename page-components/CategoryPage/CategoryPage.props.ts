import { ParsedUrlQuery } from "querystring";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { MenuItem } from "../../interfaces/menu.interface";

export interface CategoryPageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menu: MenuItem[];
  params: ParsedUrlQuery;
}
