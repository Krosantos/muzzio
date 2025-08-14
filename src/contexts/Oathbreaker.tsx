import { create } from "zustand";

interface OathbreakerContext {
  oathbreaker?: Card;
  signatureSpell?: Card;
  colorIdentity: string[];
  setOathbreaker: (card: Card) => void;
  setSignatureSpell: (card: Card) => void;
}

export const useOathbreaker = create<OathbreakerContext>((set, get) => {
  return {
    colorIdentity: ["c"],
    setOathbreaker(card) {
      set({ oathbreaker: card, signatureSpell: undefined });
    },
    setSignatureSpell(card) {
      set({ signatureSpell: card });
    },
  };
});
