import get from "lodash/get";

type ExtractOracleText = (card: RawCard) => string;
const extractOracleText: ExtractOracleText = (card) => {
  const main = get(card, "oracle_text");
  const transform = get(card, "card_faces.0.oracle_text");

  return main || transform || "";
};

export default extractOracleText;
