import { SortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

export type SortActions =
  | { type: SortEnum.Price }
  | { type: SortEnum.Rating }
  | { type: "reset"; initialState: ProductModel[] };

export interface SortReducerState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions
): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort(
          (a, b) => b.initialRating - a.initialRating
        ),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => a.price - b.price),
      };
    case "reset":
      return {
        sort: SortEnum.Rating,
        products: action.initialState,
      };

    default:
      throw new Error("Неверный тип сортировки");
  }
};
