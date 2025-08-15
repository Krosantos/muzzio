import React from "react";
import {
  COMMANDER,
  OATHBREAKER,
  LEGACY,
  MODERN,
  PAUPER,
  PIONEER,
  STANDARD,
  VINTAGE,
  BRAWL,
} from "@constants";
import Commander from "./Commander";
import Oathbreaker from "./Oathbreaker";
import Default from "./Default";
import { useFormat } from "@contexts/Format";

const componentMap = {
  [BRAWL]: Commander,
  [COMMANDER]: Commander,
  [LEGACY]: Default,
  [MODERN]: Default,
  [OATHBREAKER]: Oathbreaker,
  [PAUPER]: Default,
  [PIONEER]: Default,
  [STANDARD]: Default,
  [VINTAGE]: Default,
};

const FormatHeader: React.FC = () => {
  const format = useFormat((s) => s.format);
  const Component = componentMap[format] || Default;

  return <Component />;
};

export default FormatHeader;
