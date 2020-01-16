import React, { useRef, useState } from "react";
import Collapsible from "react-native-collapsible";
import { Text, Item as FormItem, Icon, Form } from "native-base";
import { TextInput, ImageEditor } from "react-native";
import Person from "../person";
import ConsumedItem from "../consumed-item";
import PersonItem from "../person-item";

type Props = {
  consumedItems: ConsumedItem[];
  visible: boolean;
};

const NewPersonForm = ({ visible, consumedItems }: Props) => {
  const inputNameRef = useRef({});
  const [person, setPerson] = useState(new Person());

  const setName = (text: string) => setPerson(p => ({ ...p, name: text }));

  const incrementItem = (id: string) => () => {
    setPerson(p => ({
      ...p,
      itens: p.itens.map(x =>
        x.id === id ? { ...x, quantity: x.quantity + 1 } : x
      )
    }));
  };

  const decrementItem = (id: string) => () => {
    setPerson(p => {
      return {
        ...p,
        itens: p.itens.map(x =>
          x.id === id ? { ...x, quantity: x.quantity - 1 } : x
        )
      };
    });
  };

  const setItemQuantity = (id: string) => (text: string) => {
    setPerson(p => ({
      ...p,
      itens: p.itens.map(x =>
        id === x.id ? { ...x, quantity: Number.parseInt(text, 10) } : x
      )
    }));
  };

  const addNewItem = (id: string) => () =>
    setPerson(p => {
      const item = consumedItems.find(x => x.id === id);
      if (!!item) {
        return {
          ...p,
          itens: p.itens.concat([
            new PersonItem({
              id: item.id,
              name: item.name,
              quantity: 1,
              value: item.value
            })
          ])
        };
      }
      return p;
    });

  const removeItem = (id: string) =>
    setPerson(p => ({
      ...p,
      itens: p.itens.filter(x => x.id !== id)
    }));

  return (
    <Collapsible collapsed={!visible}>
      <Form>
        <FormItem inlineLabel picker style={{ marginVertical: 10 }}>
          <Icon name="user" type="FontAwesome" />
          <Text onPress={inputNameRef.current.focus}>Fulano: </Text>
          <TextInput
            onChangeText={setName}
            value={person.name}
            style={{ width: "100%" }}
            ref={inputNameRef}
          />
        </FormItem>
      </Form>
    </Collapsible>
  );
};

export default NewPersonForm;
