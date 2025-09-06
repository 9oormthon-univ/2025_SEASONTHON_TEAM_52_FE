import { Slot } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChevronLeft from "../../assets/svg/ChevronLeft";
import { router } from "expo-router";
import { TEXT } from "../../constants/TextStyles";

export default function RecruitLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft width={10} height={15} />
          </Pressable>
          <Text style={TEXT.body1}>모집글 작성하기</Text>
          <View style={styles.rightSpace} />
        </View>
        <View style={styles.body}>
          <Slot />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // ✅ 헤더에만 적용
    paddingTop: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    flex: 1,
  },
  rightSpace: {
    width: 40, // backBtn과 같은 크기
  },
  body: {
    flex: 1,
    // ✅ paddingHorizontal 제거
  },
});
