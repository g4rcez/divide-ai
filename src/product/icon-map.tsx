import { Icon } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import colors from "../styles/colors";

const styles = StyleSheet.create({
  beer: {
    fontSize: 14,
    color: "#ffd700"
  },
  coffee: {
    color: "#523521",
    fontSize: 14
  },
  glass: {
    fontSize: 14,
    color: "#6897bb"
  },
  normal: {
    fontSize: 14,
    color: colors.textOnLight
  }
});

const keywords = (...args: string[]) => new RegExp(`(${args.join("|")})`, "gi");

const knowElements = [
  {
    regex: keywords("cervejas?", "chopps?", "beers?"),
    name: "beer"
  },
  {
    regex: keywords("cafe?", "café", "coffees?"),
    name: "coffee",
    type: "FontAwesome" as "FontAwesome"
  },
  {
    regex: keywords("drinks?", "shots?"),
    name: "glass",
    type: "FontAwesome" as "FontAwesome"
  }
];

export const textComprehension = (str: string) => {
  const icon = knowElements.find(x => x.regex.test(str));
  if (!!icon) {
    const { regex, ...props } = icon;
    return <Icon {...props} style={styles[icon.name]} />;
  }
  return <Icon name="shopping-cart" type="FontAwesome" style={styles.normal} />;
};

export default {
  beer: <Icon style={styles.beer} name="beer" />
};
