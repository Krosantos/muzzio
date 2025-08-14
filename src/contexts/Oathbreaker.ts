import { create } from "zustand";

interface OathbreakerContext {
  oathbreaker?: Card;
  signatureSpell?: Card;
  colorIdentity: string[];
  setOathbreaker: (card: Card) => void;
  setSignatureSpell: (card: Card) => void;
  loadFromSave: (data: SaveableOathbreakerContext) => void;
}

export type SaveableOathbreakerContext = Pick<
  OathbreakerContext,
  "oathbreaker" | "signatureSpell"
>;

export const useOathbreaker = create<OathbreakerContext>((set, get) => {
  return {
    colorIdentity: ["c"],
    setOathbreaker(card) {
      set({ oathbreaker: card, signatureSpell: undefined, colorIdentity: card.identity });
    },
    setSignatureSpell(card) {
      set({ signatureSpell: card });
    },
    loadFromSave(data) {
      if (!data) {
        set({ colorIdentity: ["c"], oathbreaker: undefined, signatureSpell: undefined });
      } else {
        const { oathbreaker, signatureSpell } = data;
        set({
          oathbreaker,
          signatureSpell,
          colorIdentity: oathbreaker?.identity ?? ["c"],
        });
      }
    },
  };
});
