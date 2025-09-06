import { StyleSheet, Text, View, Pressable } from "react-native";
import { router, Slot } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChevronLeft from "../../assets/svg/ChevronLeft";
import { TEXT } from "../../constants/TextStyles";
import colors from "../styles/colors";

const RentData = () => {
  const [selectedTab, setSelectedTab] = useState<
    "아파트" | "오피스텔" | "빌라"
  >("아파트");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 헤더 */}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft width={10} height={15} />
          </Pressable>
          <Text style={TEXT.body1}>영등포구 월세 통계</Text>
          <View style={styles.rightSpace} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={TEXT.body1}>2025. 08</Text>
        </View>

        {/* 탭 헤더 */}
        <View style={styles.tabHeader}>
          {["아파트", "오피스텔", "빌라"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab as any)}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActivated,
              ]}
            >
              <Text
                style={[
                  TEXT.body1,
                  {
                    color:
                      selectedTab === tab ? colors.mainColor : colors.black,
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
        <Slot />
      </View>
    </SafeAreaView>
  );
};

export default RentData;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightSpace: {
    width: 40,
  },
  tabHeader: {
    borderBottomColor: colors.mainSub1,
    borderBottomWidth: 0.5,
    marginLeft: -20,
    marginRight: -20,
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 30,
    gap: 16,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tabButtonActivated: {
    borderBottomColor: colors.mainColor,
    borderBottomWidth: 2,
  },
});
