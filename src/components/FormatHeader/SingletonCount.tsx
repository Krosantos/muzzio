import React, { useMemo } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
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
import { useCards } from "@contexts/Card";

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
  const commander = useCommander((s) => s.commander);
  const partner = useCommander((s) => s.partner);
  const oathbreaker = useOathbreaker((s) => s.oathbreaker);
  const signatureSpell = useOathbreaker((s) => s.signatureSpell);
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

const SingletonCount: React.FC = () => {
  const cardData = useCards((s) => s.cardData);
  const cardsInDeck = useCards((s) => s.cardsInDeck);
  const format = useFormat((s) => s.format);
  const commandZoneCount = useCommandZoneCards(format);

  const OUT_OF_X = useMemo(() => `/${formatCounts[format] || DEFAULT_COUNT}`, [format]);
  const count = Object.keys(cardsInDeck).length + commandZoneCount;

  const cmc = getAverageCmc(Object.keys(cardsInDeck), cardData).toPrecision(3);

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
