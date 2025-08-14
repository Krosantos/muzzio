import { uniq } from "lodash";

export const getCombinedCI = (cards: Card[]): string[] => {
  let duped: string[] = [];
  for (let card of cards) {
    if (!card.identity) continue;
    duped = duped.concat(card.identity);
  }
  const result = uniq(duped);
  if (result.length < 1) return ["c"];
  return result;
};
