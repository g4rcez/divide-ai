import {
  Form,
  Icon,
  Input,
  Item as FormItem,
  Label,
  Text,
  Title,
  View
} from "native-base";
import React, { useRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import Collapse from "react-native-collapsible";
import useReducer from "../../hooks/useReducer";
import Button from "../../lego-native/button";
import colors from "../../styles/colors";
import Person from "../person";
import PersonItem from "../person-item";

const styles = StyleSheet.create({
  title: { color: colors.textOnLight, fontSize: 30 },
  newPerson: {
    paddingVertical: 5,
    paddingTop: 20,
    justifyContent: "center",
    width: "100%"
  },
  textBold: { fontWeight: "bold" },
  itensView: { marginVertical: 15 },
  personAccountTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 15
  },
  main: { width: "100%" },
  itemRegister: {
    marginVertical: 10
  }
});

const initial = {
  collapsedNewPerson: true as boolean,
  persons: [] as Person[],
  item: new PersonItem(),
  person: new Person()
};

const Account = () => {
  const inputRef = useRef({});
  const { state, ...reducer } = useReducer(initial, {
    onChangeView: () => ({
      collapsedNewPerson: !state.collapsedNewPerson
    }),
    onChangePerson: (field: keyof Person, value: unknown) => ({
      person: { ...state.person, [field]: value }
    })
  });

  console.log("INPUT REF", inputRef.current);
  const changeName = (e: string) => reducer.onChangePerson("name", e);

  return (
    <View style={styles.main}>
      <Title style={styles.title}>Divide aí a conta</Title>
      <View style={styles.newPerson}>
        <Button onPress={reducer.onChangeView}>+ Novo candango</Button>
        <Collapse collapsed={state.collapsedNewPerson}>
          <Text style={styles.personAccountTitle}>
            Conta do {state.person.name}
          </Text>
          <Form>
            <View>
              <FormItem floatingLabel>
                <Label>Nome do fulano</Label>
                <Input onChangeText={changeName} />
              </FormItem>
            </View>
            <View style={styles.itensView}>
              <Text>
                O que{" "}
                <Text style={styles.textBold}>
                  {state.person.name || "Fulano"}
                </Text>{" "}
                consumiu?
              </Text>
              <View style={styles.itemRegister}>
                <FormItem inlineLabel picker>
                  <Icon name="product-hunt" type="FontAwesome" />
                  <Text onPress={inputRef.current.focus}>Nome do item: </Text>
                  <TextInput ref={inputRef} />
                </FormItem>
              </View>
            </View>
          </Form>
        </Collapse>
      </View>
    </View>
  );
};

export default Account;
