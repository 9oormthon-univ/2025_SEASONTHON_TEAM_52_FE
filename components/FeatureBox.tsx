// components/FeatureBox.tsx
import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { TEXT } from "../constants/TextStyles";
import colors from "../app/styles/colors";

type Props = {
  label: string;
  value: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
};

export default function FeatureBox({
  label,
  value,
  containerStyle,
  labelStyle,
  valueStyle,
}: Props) {
  return (
    <View style={[styles.box, containerStyle]}>
      <Text style={[TEXT.body4, styles.label, labelStyle]}>{label}</Text>
      <Text style={[TEXT.body22, styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 72,
    borderRadius: 8,
    backgroundColor: colors.mainSub2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12.5,
  },
  label: {
    color: colors.blackSub1,
    marginBottom: 2,
    textAlign: "center",
  },
  value: {
    color: colors.mainColor,
    textAlign: "center",
  },
});
