import { produce } from "immer";
import { create } from "zustand";

export interface Attribute {
  name: string;
  /** Card names contained in this attribute */
  cards: { [cardName: string]: true };
}

interface AttributeContext {
  attributes: { [attributeName: string]: Attribute };
  addAttribute: (name: string) => void;
  removeAttribute: (name: string) => void;
  loadFromSave: (data: SaveableAttributeContext) => void;

  addCardToAttribute: (cardName: string, attributeName: string) => void;
  removeCardFromAttribute: (cardName: string, attributeName: string) => void;
  handleCardDeletion: (cardName: string) => void;
}

export type SaveableAttributeContext = Pick<AttributeContext, "attributes">;

export const useAttributes = create<AttributeContext>((set, get) => {
  return {
    attributes: {},
    addAttribute(name) {
      let toSet = { ...get().attributes };
      toSet[name] = { name, cards: {} };
      set({ attributes: toSet });
    },
    removeAttribute(name) {
      let toSet = { ...get().attributes };
      delete toSet[name];
      set({ attributes: toSet });
    },
    loadFromSave(data) {
      if (!data) {
        set({ attributes: {} });
      } else {
        set({ attributes: data.attributes });
      }
    },

    addCardToAttribute(cardName, attributeName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        if (!draft[attributeName]) return;
        draft[attributeName].cards[cardName] = true;
        console.log("Setting", attributeName, cardName);
      });
      console.log({ toSet });
      set({ attributes: toSet });
    },

    removeCardFromAttribute(cardName, attributeName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        if (!draft[attributeName]) return;
        delete draft[attributeName].cards[cardName];
      });
      set({ attributes: toSet });
    },

    handleCardDeletion(cardName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        let attributes = Object.keys(draft);
        for (let att of attributes) {
          delete draft[att].cards[cardName];
        }
      });
      set({ attributes: toSet });
    },
  };
});
