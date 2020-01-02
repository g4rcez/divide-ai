import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { StyleSheet, View } from "react-native";
import { Text, Container } from "native-base";
import Button from "./src/lego-native/button";
import { ThemeProvider } from "styled-components";
import colors from "./src/styles/colors";
import * as Font from "expo-font";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Navbar from "./src/navbar";
import Account from "./src/account/components/main.page";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
      ...FontAwesome5.font
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={colors}>
      <Container style={{ backgroundColor: "#000" }}>
        <Navbar />
        <View style={styles.body}>
          <Account />
        </View>
      </Container>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
