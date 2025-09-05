import { Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
