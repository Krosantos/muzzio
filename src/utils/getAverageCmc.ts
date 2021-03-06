import values from "lodash/values";
import get from "lodash/get";

type GetAverageCmc = (cardObject: any) => number;

const getAverageCmc: GetAverageCmc = (cardObject) => {
  const cards = values(cardObject);
  const nonLand = cards.filter((card) => {
    const type = get(card, "type");

    return type && !type.includes("Land");
  });
  const totalMana = cards.reduce((prev, curr) => prev + curr.cmc, 0);

  return nonLand.length ? totalMana / nonLand.length : 0;
};

export default getAverageCmc;
