import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TEXT } from "../../../constants/TextStyles";
import { router } from "expo-router";
import { useState } from "react";

const Setting = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={TEXT.title1}>설정</Text>
        </View>
        <Pressable
          onPress={() => router.push("(tabs)/(setting)/SettingStatistics")}
        >
          <Text>통계</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
