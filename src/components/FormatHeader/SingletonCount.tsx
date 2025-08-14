import React, { useMemo } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import useCards from "@hooks/useCards";
import getAverageCmc from "@utils/getAverageCmc";
import {
  BRAWL,
  COMMANDER,
  OATHBREAKER,
  LEGACY,
  MODERN,
  PAUPER,
  PIONEER,
  STANDARD,
  VINTAGE,
} from "@constants";
import { useOathbreaker } from "@contexts/Oathbreaker";
import { useCommander } from "@contexts/Commander";
import { useFormat } from "@contexts/Format";

const DEFAULT_COUNT = 60;
const formatCounts = {
  [BRAWL]: DEFAULT_COUNT,
  [COMMANDER]: 100,
  [LEGACY]: DEFAULT_COUNT,
  [MODERN]: DEFAULT_COUNT,
  [OATHBREAKER]: DEFAULT_COUNT,
  [PAUPER]: DEFAULT_COUNT,
  [PIONEER]: DEFAULT_COUNT,
  [STANDARD]: DEFAULT_COUNT,
  [VINTAGE]: DEFAULT_COUNT,
};
const CMC = "CMC: ";

type UseCommandZoneCards = (format: string) => number;
const useCommandZoneCards: UseCommandZoneCards = (format) => {
  const { commander, partner } = useCommander();
  const { oathbreaker, signatureSpell } = useOathbreaker();

  const commandZoneCount = useMemo(() => {
    let result = 0;

    if (format === COMMANDER) {
      if (!isEmpty(commander)) result += 1;
      if (!isEmpty(partner)) result += 1;
    }
    if (format === OATHBREAKER) {
      if (!isEmpty(oathbreaker)) result += 1;
      if (!isEmpty(signatureSpell)) result += 1;
    }
    return result;
  }, [format, commander, partner, oathbreaker, signatureSpell]);

  return commandZoneCount;
};

type CalculateCardCount = (cardsInDeck: Card[], commandZoneCount: number) => number;
const calculateCardCount: CalculateCardCount = (
  cardsInDeck = [],
  commandZoneCount = 0,
) => {
  let result = commandZoneCount;

  cardsInDeck.forEach((card) => {
    result += card.count || 1;
  });
  return result;
};

const SingletonCount: React.FC = () => {
  const { cardsInDeck } = useCards();
  const format = useFormat((s) => s.format);
  const commandZoneCount = useCommandZoneCards(format);
  const OUT_OF_X = useMemo(() => `/${formatCounts[format] || DEFAULT_COUNT}`, [format]);
  const count = useMemo(
    () => calculateCardCount(cardsInDeck(), commandZoneCount),
    [cardsInDeck, commandZoneCount],
  );
  const cmc = getAverageCmc(cardsInDeck()).toPrecision(3);

  return (
    <Count>
      <span>
        {count}
        {OUT_OF_X}
      </span>
      <span>
        {CMC}
        {cmc}
      </span>
    </Count>
  );
};

const Count = styled.div`
  margin: 0 8px;
  width: 85px;
  display: flex;
  flex-direction: column;
  > * {
    height: 50%;
  }
`;

export default SingletonCount;
