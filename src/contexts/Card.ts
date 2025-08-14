import { produce } from "immer";
import { create } from "zustand";
import { useAttributes } from "./Attributes";

interface CardsContext {
  cardData: { [name: string]: Card };
  cardsInDeck: { [name: string]: number };
  cardsInSideboard: { [name: string]: number };

  addCard: (card: Card) => void;
  removeCard: (name: string) => void;
  setCount: (name: string, count: number) => void;
  setSideboardCount: (name: string, count: number) => void;

  loadFromSave: (data: SaveableCardContext) => void;
  clearDeck: () => void;
}

export type SaveableCardContext = Pick<
  CardsContext,
  "cardData" | "cardsInDeck" | "cardsInSideboard"
>;

export const useCards = create<CardsContext>((set, get) => {
  return {
    cardData: {},
    cardsInDeck: {},
    cardsInSideboard: {},

    addCard(card) {
      if (!card.name) return;
      const prev = get();
      const toSet = produce(prev, (draft) => {
        draft.cardData[card.name] = card;
        draft.cardsInDeck[card.name] = 0;
        draft.cardsInSideboard[card.name] = 0;
      });
      set(toSet);
    },
    removeCard(name) {
      const prev = get();
      const toSet = produce(prev, (draft) => {
        delete draft.cardData[name];
        delete draft.cardsInDeck[name];
        delete draft.cardsInSideboard[name];
      });
      set(toSet);
      useAttributes.getState().handleCardDeletion(name);
    },
    setCount(name, count) {
      const prev = get();
      const toSet = produce(prev, (draft) => {
        draft.cardsInDeck[name] = count;
      });
      set(toSet);
    },
    setSideboardCount(name, count) {
      const prev = get();
      const toSet = produce(prev, (draft) => {
        draft.cardsInSideboard[name] = count;
      });
      set(toSet);
    },

    loadFromSave(data) {
      set({
        cardData: data.cardData,
        cardsInDeck: data.cardsInDeck,
        cardsInSideboard: data.cardsInSideboard,
      });
    },

    clearDeck() {
      const prev = get();
      const cardNames = Object.keys(prev.cardData);
      const emptyCount: { [name: string]: number } = {};
      for (let name of cardNames) {
        emptyCount[name] = 0;
      }
      const toSet = produce(prev, (draft) => {
        draft.cardsInDeck = emptyCount;
        draft.cardsInSideboard = emptyCount;
      });
      set(toSet);
    },
  };
});
