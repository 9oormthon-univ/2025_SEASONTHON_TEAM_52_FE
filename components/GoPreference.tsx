import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TEXT } from "../constants/TextStyles";
import { router } from "expo-router";
import PrimaryButton from "./PrimaryButton";

const GoPreference = () => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 243, 234, 0.85)",
        height: 340,
        width: 420,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        position: "absolute",
        alignSelf: "center",
        marginTop: 20,
      }}
    >
      <Image
        source={require("../assets/icon/Puzzle.png")}
        style={{ width: 187, height: 119 }}
      />
      <Text style={[TEXT.body22, { textAlign: "center", marginTop: 6 }]}>
        {`내가 원하는 성향을\n입력해야 사용할 수 있어요`}
      </Text>
      <PrimaryButton
        text="성향 작성하러 가기"
        style={{ width: 241, marginTop: 12 }}
        onPress={() => router.push("preferences/1")}
      />
    </View>
  );
};

export default GoPreference;

const styles = StyleSheet.create({});
