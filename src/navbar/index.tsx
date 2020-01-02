import { Body, Button, Header, Icon, Right, Text, Title } from "native-base";
import React from "react";
import { Platform } from "react-native";
import colors from "../styles/colors";

const Navbar = () => {
  return (
    <Header
      androidStatusBarColor="#fff"
      iosBarStyle="light-content"
      noLeft
      style={{
        marginTop: Platform.OS === "ios" ? 0 : 28,
        backgroundColor: colors.primary
      }}
    >
      <Body>
        <Title>DivideAí</Title>
      </Body>
      <Right>
        <Button hasText transparent>
          <Text>
            <Icon
              ios="ios-menu"
              android="md-menu"
              style={{ fontSize: 20, color: colors.textOnDark }}
            />
          </Text>
        </Button>
      </Right>
    </Header>
  );
};

export default Navbar;
