import { Slot, usePathname } from "expo-router";
import { View, StyleSheet, Dimensions } from "react-native";
import TabBar from "../../components/TabBar";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
          {/* Home, Matching, Progress 등 현재 탭 */}
        </View>
        <TabBar style={styles.tab} />
        {/* 항상 하단 고정 */}
      </View>
      <SafeAreaView edges={["bottom"]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tab: {
    top: height * 0.88,
    left: 0,
    right: 0,
    position: "absolute",
  },
});
