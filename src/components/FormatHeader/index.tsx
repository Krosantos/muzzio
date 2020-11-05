import React from "react";
import useFormat from "@hooks/useFormat";
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
  const { format } = useFormat();
  const Component = componentMap[format] || Default;

  return <Component />;
};

export default FormatHeader;
