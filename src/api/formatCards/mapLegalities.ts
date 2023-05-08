import { formats } from "@constants";

type MapLegalities = (card: RawCard) => Card["legalFormats"];
const mapLegalities: MapLegalities = (card) => {
  const { legalities } = card;
  const result: Card["legalFormats"] = {
    BRAWL: false,
    COMMANDER: false,
    LEGACY: false,
    MODERN: false,
    OATHBREAKER: false,
    PAUPER: false,
    PIONEER: false,
    STANDARD: false,
    VINTAGE: false,
  };

  Object.keys(formats).forEach((f: keyof typeof formats) => {
    const format = formats[f].toLowerCase() as keyof typeof legalities;
    const isLegal = legalities[format] === "legal";

    result[f] = isLegal;
  });
  return result;
};

export default mapLegalities;
