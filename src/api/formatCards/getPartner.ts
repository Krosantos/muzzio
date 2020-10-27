import { ANY_PARTNER, SPECIFIC_PARTNER, NO_PARTNER } from "@constants";
import extractOracleText from "./extractOracleText";

type GetPartner = (card: RawCard) => Card["partnerQuery"];
const getPartner: GetPartner = (card) => {
  const { all_parts: allParts, name } = card;
  const oracleText = extractOracleText(card);

  if (oracleText.includes("Partner with")) {
    const partner = allParts.find(
      ({ component, name: partName }) => component === "combo_piece" && partName !== name,
    );

    return { query: ` !"${partner.name}"`, type: SPECIFIC_PARTNER };
  }
  if (oracleText.includes("Partner"))
    return { query: ` -"${name}" o:Partner -o:"Partner with"`, type: ANY_PARTNER };
  return { type: NO_PARTNER };
};

export default getPartner;
