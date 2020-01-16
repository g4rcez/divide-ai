import React, { useRef, useState } from "react";
import {
  Form,
  View,
  Item as FormItem,
  Icon,
  Text,
  Container
} from "native-base";
import { TextInput, StyleSheet } from "react-native";
import CurrencyInput from "../../lego-native/currency-input";
import colors from "../../styles/colors";
import Button from "../../lego-native/button";

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
  },
  viewSubmit: {
    marginVertical: 5,
    alignContent: "flex-end",
    textAlign: "right",
    justifyContent: "flex-end",
    width: "60%"
  }
});

type Props = {
  onSubmit(values: { name: string; value: string }): any;
};

const NewItemForm = (props: Props) => {
  const namRef = useRef({});
  const priceRef = useRef({});
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const submit = () => {
    props.onSubmit({ name, value });
    setName("");
    setValue("");
  };

  return (
    <Form>
      <View style={styles.itensView}>
        <View style={styles.itemRegister}>
          <FormItem inlineLabel picker style={{ marginVertical: 10 }}>
            <Icon
              onPress={namRef.current.focus}
              name="product-hunt"
              type="FontAwesome"
            />
            <Text onPress={namRef.current.focus}>Nome do item: </Text>
            <TextInput
              onChangeText={setName}
              value={name}
              style={{ width: "100%" }}
              ref={namRef}
            />
          </FormItem>
          <FormItem inlineLabel picker style={{ marginVertical: 10 }}>
            <Icon name="product-hunt" type="FontAwesome" />
            <Text onPress={priceRef.current.focus}>Preço do item: </Text>
            <CurrencyInput
              value={value}
              style={{ width: "100%" }}
              ref={priceRef}
              onChangeText={setValue}
            />
          </FormItem>
        </View>
        <View style={styles.viewSubmit}>
          <Button disabled={name === "" || value === ""} onPress={submit}>
            Cadastrar item
          </Button>
        </View>
      </View>
    </Form>
  );
};

export default NewItemForm;
