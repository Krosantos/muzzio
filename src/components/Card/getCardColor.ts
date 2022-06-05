import type { Format } from "@contexts/Format";
import { DefaultTheme } from "styled-components";

type CardProps = {
  card: Card;
  alwaysColorful: boolean;
  theme: DefaultTheme;
  format: Format;
};
type ColorResult = {
  color: string;
  bgColor: string;
};
type GetCardColor = (props: CardProps) => ColorResult;

const getCardColor: GetCardColor = ({ card, alwaysColorful, theme, format }) => {
  const {
    count,
    sideboardCount,
    colors,
    legalFormats = {} as Card["legalFormats"],
  } = card;
  const inDeck = count > 0;
  const inSideboard = sideboardCount > 0;
  const notInDeck = !inDeck && !inSideboard && !alwaysColorful;

  const result: ColorResult = {
    bgColor: theme.cardMulti,
    color: theme.black,
  };

  if (colors.length < 1) result.bgColor = theme.cardColorless;

  const color = colors[0];

  switch (color) {
    case "W":
      result.bgColor = theme.cardWhite;
      break;
    case "U":
      result.bgColor = theme.cardBlue;
      break;
    case "B":
      result.bgColor = theme.cardBlack;
      break;
    case "R":
      result.bgColor = theme.cardRed;
      break;
    case "G":
      result.bgColor = theme.cardGreen;
      break;
    default:
      break;
  }
  if (colors.length > 1) result.bgColor = theme.cardMulti;
  if (notInDeck) {
    result.bgColor = theme.granite;
    result.color = theme.white;
  }

  const isIllegal = !legalFormats[format];

  if (isIllegal) {
    result.bgColor = theme.white;
    result.color = theme.red;
  }

  return result;
};

export default getCardColor;
