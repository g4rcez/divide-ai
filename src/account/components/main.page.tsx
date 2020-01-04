import { Text, Title, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Collapse from "react-native-collapsible";
import useReducer from "../../hooks/useReducer";
import Button from "../../lego-native/button";
import { formatBrlToFloat } from "../../lego-native/currency-input";
import { textComprehension } from "../../product/icon-map";
import colors from "../../styles/colors";
import ConsumedItem from "../consumed-item";
import Person from "../person";
import PersonItem from "../person-item";
import ListRegisterItems from "./list-register-items";
import NewItemForm from "./new-item.form";

const styles = StyleSheet.create({
  title: { color: colors.textOnLight, fontSize: 30 },
  eyeIcon: { fontSize: 15 },
  newPerson: {
    paddingVertical: 5,
    paddingTop: 20,
    justifyContent: "center",
    width: "100%"
  },
  itensView: { marginVertical: 15 },
  main: { justifyContent: "center", width: "100%" },
  container: {
    marginVertical: 5,
    flex: 1,
    flexDirection: "column"
  },
  fluxButtons: {
    marginVertical: 5
  }
});

const initial = {
  collapseItem: true as boolean,
  collapsePerson: true as boolean,
  items: [] as ConsumedItem[],
  personItem: new PersonItem(),
  persons: [] as Person[]
};

const Account = () => {
  const [state, dispatch] = useReducer(initial, {
    onToggleItem: currState => ({
      ...currState,
      collapseItem: !currState.collapseItem
    }),
    onTogglePerson: currState => ({
      ...currState,
      collapsePerson: !currState.collapsePerson
    }),
    addItem: (currState, action) => ({
      ...currState,
      items: [...currState.items, action.item]
    }),
    removeItem: (currState, action) => ({
      ...currState,
      items: currState.items.filter(x => x.id !== action.id)
    })
  });

  const toggleNewItem = () => dispatch({ type: "onToggleItem" });

  const toggleNewPerson = () => dispatch({ type: "onTogglePerson" });

  const remove = (id: string) => () => dispatch({ type: "removeItem", id });

  const submit = ({ name, value }: { name: string; value: string }) => {
    const item = new ConsumedItem({
      icon: textComprehension(name),
      name,
      value: formatBrlToFloat(value)
    });
    dispatch({ type: "addItem", item });
  };

  return (
    <View style={styles.main}>
      <View style={styles.main}>
        <Title style={styles.title}>Divide aí a conta</Title>
        <View style={styles.newPerson}>
          <Button style={styles.fluxButtons} onPress={toggleNewItem}>
            {state.collapseItem ? "1. Novo Item" : "1. Acabou os itens"}
          </Button>
          <Button
            style={styles.fluxButtons}
            onPress={toggleNewPerson}
            disabled={state.items.length === 0}
          >
            {state.collapsePerson
              ? "2. Dividir com mais um"
              : "2. Chega de gente"}
          </Button>
          <Collapse collapsed={state.collapseItem}>
            <NewItemForm onSubmit={submit} />
          </Collapse>
          <Collapse collapsed={state.collapsePerson}>
            <Text>Adicionar gente</Text>
          </Collapse>
        </View>
      </View>
      <ListRegisterItems items={state.items} remove={remove} />
    </View>
  );
};

export default Account;
