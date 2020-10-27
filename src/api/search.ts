import get from "lodash/get";
import formatCards from "./formatCards";
import api from ".";

type ApiResponse = {
  data: {
    data: RawCard[];
  };
};

type Search = (query: string) => Promise<Card[]>;
const search: Search = async (query) => {
  let newQuery = query;

  newQuery += " game:paper not:promo order:cmc lang:english";
  const config = {
    params: {
      q: newQuery,
    },
  };

  try {
    const response = await api.get<ApiResponse>("search", config);
    const cards = get(response, "data.data", []) as RawCard[];

    return formatCards(cards);
  } catch {
    return [];
  }
};

export default search;
