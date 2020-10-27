/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import symbolMap from "./symbolMap";

const SLASHES = "//";

type SplitCosts = (cost: string) => string[];
const splitCosts: SplitCosts = (cost) => {
  const costs = cost.split(/ \/\/ /);

  return costs;
};

type SplitMana = (cost: string) => CostFragment[];
const splitMana: SplitMana = (cost) => {
  const fragments = cost.split(/}{/);

  return fragments.map((fragment) => fragment.replace(/[}{]/g, "") as CostFragment);
};

type CostFragment = keyof typeof symbolMap;
type SymbolProps = {
  costFragment: CostFragment;
};
const Symbol: React.FC<SymbolProps> = ({ costFragment }) => {
  const src = symbolMap[costFragment];

  return <ManaSymbol alt="" src={src} />;
};

type ManaCostProps = {
  cost: string;
};
const ManaCost: React.FC<ManaCostProps> = ({ cost = "" }) => {
  const [frontCost, backCost] = splitCosts(cost);

  return (
    <CostContainer>
      <Cost cost={frontCost} />
      {backCost && (
        <>
          <span>{SLASHES}</span>
          <Cost cost={backCost} />
        </>
      )}
    </CostContainer>
  );
};

type CostProps = {
  cost: string;
};
const Cost: React.FC<CostProps> = ({ cost }) => {
  if (!cost) return null;
  const fragments = splitMana(cost);

  return (
    <>
      {fragments.map((fragment, index) => (
        <Symbol costFragment={fragment} key={index} />
      ))}
    </>
  );
};

const ManaSymbol = styled.img`
  display: block;
  border: 1px solid ${({ theme }) => theme.smoke};
  border-radius: 0.5em;
  height: 1em;
  width: 1em;
  margin: 0 0.075em;
  box-shadow: 1px 1px 1px ${({ theme }) => theme.smoke};
`;

const CostContainer = styled.div`
  display: flex;
`;

export default React.memo(ManaCost);
