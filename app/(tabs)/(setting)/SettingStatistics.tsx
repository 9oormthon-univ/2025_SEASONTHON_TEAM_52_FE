import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TEXT } from "../../../constants/TextStyles";
import { router } from "expo-router";
import ChevronLeft from "../../../assets/svg/ChevronLeft";
import { useState } from "react";
import colors from "../../styles/colors";

const SettingStatistics = () => {
  const [selectedTab, setSelectedTab] = useState<
    "지역별 분석" | "추가 선호도" | "경제적 분석"
  >("지역별 분석");
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft width={10} height={15} />
          </Pressable>
          <Text style={TEXT.body1}>통계</Text>
          <View style={styles.rightSpace} />
        </View>
      </SafeAreaView>
      <View style={styles.tabHeader}>
        {["지역별 분석", "추가 선호도", "경제적 분석"].map((tab) => (
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
                  color: selectedTab === tab ? colors.mainColor : colors.black,
                },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default SettingStatistics;

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
    width: 40, // backBtn과 같은 크기
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
