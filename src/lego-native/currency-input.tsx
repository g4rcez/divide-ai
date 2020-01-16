import Decimal from "decimal.js";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  TextInput,
  TextInputAndroidProperties,
  TextInputIOSProperties
} from "react-native";

export const formatBrlToFloat = (currency: string) => {
  const final = currency
    .replace(/,/g, ".")
    .replace(/(.*)\./, x => x.replace(/\./g, "") + ".")
    .replace(/[^0-9\.]/g, "");
  return new Decimal(final).toDP(2).toNumber();
};

export type CurrencyInputType = TextInputAndroidProperties &
  TextInputIOSProperties & {
    prefix?: string;
    name: string;
    ref: any;
    value: string;
    separator?: string;
    onChangeText(e: string): any;
  };

const fromValue = (value = "") =>
  value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "";

const padding = (digits: string) => {
  const minLength = 3;
  const currentLength = digits.length;
  if (currentLength >= minLength) {
    return digits;
  }
  const amountToAdd = minLength - currentLength;
  return `${"0".repeat(amountToAdd)}${digits}`;
};

const removeLeadingZeros = (num: string) => num.replace(/^0+([0-9]+)/, "$1");

const addDecimals = (num: string, separator = ",") => {
  const centsStart = num.length - 2;
  const amount = removeLeadingZeros(num.substring(0, centsStart));
  const cents = num.substring(centsStart);
  return amount + separator + cents;
};

export const toCurrency = (value: string, separator = ",", prefix = "R$ ") => {
  const valueToMask = padding(fromValue(value));
  return `${prefix}${addDecimals(valueToMask, separator)}`;
};

export const currency = (str: string | number | string[] = "0") =>
  toCurrency(Number.parseFloat(`${str}`).toFixed(2));

const CurrencyInput = React.forwardRef(
  (
    {
      prefix = "R$ ",
      onChangeText,
      separator = ",",
      ...props
    }: CurrencyInputType,
    externalRef
  ) => {
    const convert = currency(props.value);
    const [value, setValue] = useState(convert);
    const internalRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(externalRef, () => internalRef.current);

    useEffect(() => {
      setValue(convert);
    }, [convert, props.value]);

    const change = (text: string) => {
      const valueAsCurrency = toCurrency(text, separator, prefix);
      const realValue = formatBrlToFloat(valueAsCurrency);
      setValue(valueAsCurrency);
      if (onChangeText) {
        return onChangeText(`${realValue}`);
      }
    };
    return (
      <TextInput
        {...props}
        //@ts-ignore
        ref={internalRef}
        value={value}
        onChangeText={change}
        keyboardType="numeric"
      />
    );
  }
);

export default CurrencyInput;
