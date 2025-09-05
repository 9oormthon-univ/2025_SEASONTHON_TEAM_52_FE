import { Slot, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../../components/TabBar";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Slot />
          {/* Home, Matching, Progress 등 현재 탭 */}
        </View>
        <TabBar />
        {/* 항상 하단 고정 */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
