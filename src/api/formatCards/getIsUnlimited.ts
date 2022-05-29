import extractOracleText from "./extractOracleText";
import extractTypeLine from "./extractTypeLine";

const ANY_NUMBER_RULE = "A deck can have any number of cards named";
const BASIC_LAND = "Basic";

type GetIsUnlimited = (card: RawCard) => boolean;
const getIsUnlimited: GetIsUnlimited = (card) => {
  const type = extractTypeLine(card);
  const oracleText = extractOracleText(card);

  return type.includes(BASIC_LAND) || oracleText.includes(ANY_NUMBER_RULE);
};

export default getIsUnlimited;
