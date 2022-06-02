type Format =
  | "BRAWL"
  | "COMMANDER"
  | "MODERN"
  | "STANDARD"
  | "PIONEER"
  | "VINTAGE"
  | "PAUPER"
  | "OATHBREAKER"
  | "LEGACY";

declare type Card = {
  id?: string;
  partnerQuery?: {
    type: "partner" | "specific" | "background" | "none";
    query?: string;
  };
  count?: number;
  isUnlimited?: boolean;
  legalFormats?: { [key in Format]: boolean };
  sideboardCount?: number;
  attributes?: { [attribute: string]: boolean };
  cmc?: number;
  colors?: string[];
  cost?: string;
  identity?: string[];
  imageUrl?: string;
  name?: string;
  reverseUrl?: string;
  type?: string;
};
