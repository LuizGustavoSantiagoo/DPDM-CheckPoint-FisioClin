import React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";

interface InputDateProps {
  label?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  backgroundColor?: string;
  marginVertical?: number;
  mode?: "outlined" | "flat";
}

const theme = () => ({
  colors: {
    primary: "#4896b8",
    text: "#000000",
    underline: "transparent",
  },
});

function InputDate({
  label,
  value,
  onChange,
  backgroundColor,
  marginVertical,
  mode,
}: InputDateProps) {

  return (
      <DatePickerInput
        mode={mode ?? "outlined"}
        theme={theme()}
        locale="pt"
        label={label}
        value={value}
        onChange={(d) => onChange?.(d)}
        inputMode="start"
      />
  );
}

export default InputDate;
