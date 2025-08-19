import get from "lodash/get";
import formatCards from "./formatCards";
import api from ".";

type ApiResponse = {
  data: {
    data: RawCard[];
  };
};

type GetCardByName = (name: string) => Promise<Card[]>;
const getCardByName: GetCardByName = async (name) => {
  const newQuery = `!"${name}" game:paper unique:prints`;
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

export default getCardByName;
