import { useState, useCallback } from "react";

const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

type Reducer<T, S> = {
  [P in keyof T]: (...args: any[]) => Partial<S>;
};

export default <S, F>(
  initialState: S,
  dispatches: Reducer<F, S>
): { state: typeof initialState } & Reducer<F, S> => {
  const [state, setState] = useState(initialState);
  const typeBaseSetState = (state: unknown) => {
    if (typeof state === "function") {
      return setState(p => ({ ...p, ...state() }));
    }
    return setState(p => ({ ...p, ...(state as Object) }));
  };
  const actions: Reducer<F, S> = Object.entries(dispatches).reduce(
    (acc, [name, fn]) => ({
      ...acc,
      [name]: pipe(useCallback(fn as any, []), typeBaseSetState) as Function
    }),
    {} as Reducer<F, S>
  );
  return { state, ...actions };
};
