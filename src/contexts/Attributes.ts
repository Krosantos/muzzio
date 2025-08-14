import { produce } from "immer";
import { create } from "zustand";

export interface Attribute {
  name: string;
  /** Card names contained in this attribute */
  cards: { [cardName: string]: true };
}

interface AttributeContext {
  attributes: Attribute[];
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
    attributes: [],
    addAttribute(name) {
      let toSet = [...get().attributes];
      toSet.push({ name, cards: {} });
      set({ attributes: toSet });
    },
    removeAttribute(name) {
      let toSet = [...get().attributes];
      toSet = toSet.filter((a) => a.name !== name);
      set({ attributes: toSet });
    },
    loadFromSave(data) {
      if (!data) {
        set({ attributes: [] });
      } else {
        set({ attributes: data.attributes });
      }
    },

    addCardToAttribute(cardName, attributeName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        if (!draft[attributeName]) return;
        draft[attributeName][cardName] = true;
      });
      set({ attributes: toSet });
    },

    removeCardFromAttribute(cardName, attributeName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        if (!draft[attributeName]) return;
        delete draft[attributeName][cardName];
      });
      set({ attributes: toSet });
    },

    handleCardDeletion(cardName) {
      const prev = get().attributes;
      const toSet = produce(prev, (draft) => {
        let attributes = Object.keys(draft);
        for (let att of attributes) {
          delete draft[att][cardName];
        }
      });
      set({ attributes: toSet });
    },
  };
});
