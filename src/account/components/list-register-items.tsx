import React from "react";
import { View, Text, Icon } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import Button from "../../lego-native/button";
import colors from "../../styles/colors";
import ConsumedItem from "../consumed-item";
import { currency } from "../../lego-native/currency-input";

const styles = StyleSheet.create({
  listItemsView: { borderTopWidth: StyleSheet.hairlineWidth, marginTop: 30 },
  eyeIcon: { fontSize: 15 },
  row: {
    marginVertical: 10,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  removeButton: {
    display: "flex",
    color: colors.textOnLight,
    backgroundColor: colors.danger
  },
  trashIcon: { fontSize: 15, color: colors.textOnDark }
});

type Props = {
  items: ConsumedItem[];
  remove: Function;
};

const ListRegisterItems = ({ items, remove }: Props) => {
  return (
    <View style={styles.listItemsView}>
      <View>
        <Text>
          <Icon name="eye" style={styles.eyeIcon} /> Esconder lista de itens
        </Text>
      </View>
      <Collapsible collapsed={false}>
        <FlatList
          data={items}
          renderItem={({ item: x }: { item: ConsumedItem }) => (
            <View style={styles.row}>
              <Text>
                {x.icon} {x.name} - {currency(`${x.value}`)}
              </Text>
              <Button style={styles.removeButton} onPress={remove(x.id)}>
                <Icon name="trash" style={styles.trashIcon} /> Remover
              </Button>
            </View>
          )}
        />
      </Collapsible>
    </View>
  );
};

export default ListRegisterItems;
