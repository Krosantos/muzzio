import { NO_PARTNER } from "@constants";
import { getCombinedCI } from "@utils/getCombinedCI";
import { create } from "zustand";

interface CommanderContext {
  commander?: Card;
  partner?: Card;
  partnerQuery: Card["partnerQuery"];
  colorIdentity: string[];
  setCommander: (card: Card) => void;
  setPartner: (card: Card) => void;
  loadFromSave: (data: SaveableCommanderContext) => void;
}

export type SaveableCommanderContext = Pick<CommanderContext, "commander" | "partner">;

export const useCommander = create<CommanderContext>((set, get) => {
  return {
    colorIdentity: ["c"],
    partnerQuery: {
      type: NO_PARTNER,
    },
    setCommander(card) {
      set({
        commander: card,
        partner: undefined,
        colorIdentity: card.identity,
        partnerQuery: card.partnerQuery,
      });
    },
    setPartner(card) {
      set({ partner: card, colorIdentity: getCombinedCI([card, get().commander]) });
    },
    loadFromSave({ commander, partner }) {
      set({
        commander,
        partner,
        partnerQuery: commander.partnerQuery,
        colorIdentity: getCombinedCI([commander, partner]),
      });
    },
  };
});
