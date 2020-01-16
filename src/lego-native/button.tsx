import { Text } from "native-base";
import React from "react";
import styled from "styled-components/native";
import colors from "../styles/colors";
import theme from "../styles/theme";

const TouchableHighlight = styled.TouchableHighlight.attrs(props => ({
  ...props,
  full: false,
  underlayColor: theme(props, "primaryHighlight")
}))`
  padding: 5px;
  border-radius: 5px;
  width: ${(props: any) => (props.full ? "100%" : "auto")};
  background-color: ${props =>
    theme(props, props.disabled ? "disabled" : "primary")};
`;

const Font = styled(Text)`
  color: ${props =>
    theme(props, props.disabled ? "disabledText" : "textOnDark")};
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 700;
  text-align: center;
`;

type Props = {
  children: React.ReactNode;
  full?: boolean;
  disabled?: boolean;
  style?: any;
  onPress: () => void;
};

const voidFn = () => {};

const Button = ({
  children,
  style = {},
  onPress,
  disabled,
  full = false
}: Props) => (
  <TouchableHighlight
    style={style}
    underlayColor={colors.primaryHighlight}
    disabled={disabled}
    full={full}
    onPress={disabled ? voidFn : onPress}
  >
    <Font disabled={disabled}>{children}</Font>
  </TouchableHighlight>
);

export default Button;
