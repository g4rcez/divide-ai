import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled, { ThemeContext } from "styled-components/native";
import theme from "../styles/theme";

const TouchableHighlight = styled.TouchableHighlight.attrs(props => ({
  ...props,
  underlayColor: theme(props, "primaryHighlight")
}))`
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => theme(props, "primary")};
  width: 100%;
  min-width: 20%;
`;

const Font = styled(Text)`
  color: ${props => theme(props, "textOnDark")};
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 700;
  text-align: center;
`;

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const Button = ({ children, onPress }: Props) => (
  <View>
    <TouchableHighlight onPress={onPress}>
      <Font>{children}</Font>
    </TouchableHighlight>
  </View>
);

export default Button;
