import { Dispatch, useReducer } from "react";

type Action = { type: string; [key: string]: unknown };
type UseReducer<State, Types> = [
  State,
  Dispatch<{ type: Types; [key: string]: unknown }>
];

type ReducerFunction<State> = (state: State, action: Action) => State;

const createReducer = <State>(
  reducer: { [key: string]: ReducerFunction<State> } & Object
) => (state: State, action: Action): State => {
  const key = action.type;
  return reducer.hasOwnProperty(key) ? reducer[key](state, action) : state;
};

export default <S extends {}, T extends string>(
  state: S,
  functions: { [type in T]: (state: S, action: any) => S }
): UseReducer<S, T> => useReducer(createReducer<S>(functions), state);
