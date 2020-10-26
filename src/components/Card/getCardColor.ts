import { DefaultTheme } from 'styled-components';

type CardProps = {
  card:Card;
  alwaysColorful: boolean;
  theme: DefaultTheme;
}
type ColorResult = {
  color:string;
  bgColor:string;
}
type GetCardColor = (props:CardProps)=>ColorResult
// eslint-disable-next-line complexity
const getCardColor:GetCardColor = ({ card, alwaysColorful, theme }) => {
  const { count, sideboardCount, colors } = card;
  const inDeck = count > 0;
  const inSideboard = sideboardCount > 0;
  const notInDeck = (!inDeck && !inSideboard && !alwaysColorful);

  const result:ColorResult = {
    bgColor: theme.cardMulti,
    color: theme.black,
  };

  if (colors.length < 1) { result.bgColor = theme.cardColorless; } else {
    const color = colors[0];

    switch (color) {
    case 'W':
      result.bgColor = theme.cardWhite;
      break;
    case 'U':
      result.bgColor = theme.cardBlue;
      break;
    case 'B':
      result.bgColor = theme.cardBlack;
      break;
    case 'R':
      result.bgColor = theme.cardRed;
      break;
    case 'G':
      result.bgColor = theme.cardGreen;
      break;
    default:
      break;
    }
  }
  if (notInDeck) {
    result.bgColor = theme.granite;
    result.color = theme.white;
  }

  return result;
};

export default getCardColor;
