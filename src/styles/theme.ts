import colors from "./colors";
export type Theme = typeof colors;

type Keys = keyof Theme;

const theme = (props: unknown & { theme: Theme }, key: Keys) =>
  props.theme[key];

export default theme;
