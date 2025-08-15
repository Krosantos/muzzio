import { NO_PARTNER } from "@constants";
import { getCombinedCI } from "@utils/getCombinedCI";
import { produce } from "immer";
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
    colorIdentity: ["C"],
    partnerQuery: {
      type: NO_PARTNER,
    } as Card["partnerQuery"],
    setCommander(card) {
      const toSet = produce(get(), (draft) => {
        draft.commander = card;
        draft.partner = undefined;
        draft.colorIdentity = card.identity;
        draft.partnerQuery = card.partnerQuery;
      });

      set(toSet);
    },
    setPartner(card) {
      const toSet = produce(get(), (draft) => {
        draft.partner = card;
        draft.colorIdentity = getCombinedCI([card, get().commander]);
      });
      set(toSet);
    },
    loadFromSave(data) {
      if (!data) {
        set({
          commander: undefined,
          partner: undefined,
          partnerQuery: undefined,
          colorIdentity: ["C"],
        });
      } else {
        const { commander, partner } = data;
        const toSet = produce(get(), (draft) => {
          draft.commander = commander;
          draft.partner = partner;
          draft.partnerQuery = commander.partnerQuery;
          draft.colorIdentity = getCombinedCI([commander, partner]);
        });
        set(toSet);
      }
    },
  };
});
