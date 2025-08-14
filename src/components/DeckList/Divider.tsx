import React, { useMemo } from "react";
import styled from "styled-components";
import useCards from "@hooks/useCards";
import { useFormat } from "@contexts/Format";

type DividerProps = {
  label: string;
};
const Divider: React.FC<DividerProps> = ({ label }) => {
  const { isSingleton } = useFormat();
  const { cardsInSideboard } = useCards();
  const shouldHideDivider = useMemo(() => {
    if (isSingleton) return true;
    const sideboardCards = cardsInSideboard();

    return sideboardCards.length <= 0;
  }, [cardsInSideboard, isSingleton]);

  if (shouldHideDivider) return null;
  return <Label>{label}</Label>;
};

const Label = styled.div`
  background-color: ${({ theme }) => theme.smoke};
  font-family: "Beleren-Caps";
  display: flex;
  color: ${({ theme }) => theme.white};
  flex-shrink: 0;
  align-items: center;
  padding: 2px 5px;
  justify-content: center;
`;

export default Divider;
