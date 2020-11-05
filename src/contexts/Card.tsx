/* eslint-disable no-case-declarations */
import React, { Reducer, useReducer, useMemo } from "react";
import merge from "lodash/merge";
import { ADD_ACTION, REMOVE_ACTION, UPDATE_ACTION, OVERWRITE } from "@constants";

type CardState = { [name: string]: Card };
type CardContextValue = {
  cards: CardState;
  dispatch: React.Dispatch<Action>;
};
type ActionType =
  | typeof ADD_ACTION
  | typeof REMOVE_ACTION
  | typeof UPDATE_ACTION
  | typeof OVERWRITE;
type Action = {
  type: ActionType;
  card?: Card;
  overriddenState?: CardState;
};

const DEFAULT_VALUE = {
  cards: {},
  dispatch: () => {},
};
const CardContext = React.createContext<CardContextValue>(DEFAULT_VALUE);

// eslint-disable-next-line complexity
const cardReducer: Reducer<CardState, Action> = (
  state,
  { type, card = {}, overriddenState },
) => {
  const { name } = card;
  const newState = { ...state };

  switch (type) {
    case ADD_ACTION:
      newState[name] = card;
      break;
    case REMOVE_ACTION:
      delete newState[name];
      break;
    case UPDATE_ACTION:
      const oldCard = newState[name];
      const newCard = merge({}, oldCard, card);

      newState[name] = newCard;
      break;
    case OVERWRITE:
      // TODO: this is gross and you know it
      return overriddenState;
    default:
      break;
  }
  return newState;
};

type CardProviderProps = {
  initialValue: CardState;
};
const CardProvider: React.FC<CardProviderProps> = ({ children, initialValue = {} }) => {
  const [cards, dispatch] = useReducer<Reducer<CardState, Action>>(
    cardReducer,
    initialValue,
  );
  const value = useMemo(() => ({ cards, dispatch }), [cards]);

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export { CardContext, CardProvider, CardState };
