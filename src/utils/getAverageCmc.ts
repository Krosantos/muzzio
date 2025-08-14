import get from "lodash/get";

const getAverageCmc = (
  cardNames: string[],
  cardData: { [cardName: string]: Card },
): number => {
  const cards = cardNames.map((name) => cardData[name]).filter((c) => !!c);

  const nonLand = cards.filter((card) => {
    const type = get(card, "type");

    return type && !type.includes("Land");
  });
  const totalMana = cards.reduce((prev, curr) => prev + curr.cmc, 0);

  return nonLand.length ? totalMana / nonLand.length : 0;
};

export default getAverageCmc;
