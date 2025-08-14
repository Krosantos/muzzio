import { ALL_CARDS } from "@constants";
import { create } from "zustand";

interface AttributeContext {
  attributes: string[];
  addAttribute: (name: string) => void;
  removeAttribute: (name: string) => void;
  loadFromSave: (data: SaveableAttributeContext) => void;
}

export type SaveableAttributeContext = Pick<AttributeContext, "attributes">;

export const useAttributes = create<AttributeContext>((set, get) => {
  return {
    attributes: [ALL_CARDS],
    addAttribute(name) {
      let toSet = [...get().attributes];
      toSet.push(name);
      set({ attributes: toSet });
    },
    removeAttribute(name) {
      let toSet = [...get().attributes];
      toSet = toSet.filter((a) => a !== name);
      set({ attributes: toSet });
    },
    loadFromSave({ attributes }) {
      set({ attributes });
    },
  };
});
