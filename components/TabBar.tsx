// components/TabBar.tsx
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { usePathname, router } from "expo-router";
import colors from "../app/styles/colors";

const TABS = [
  { name: "홈", route: "/(tabs)/Home" },
  { name: "매칭", route: "/(tabs)/matching" },
  { name: "진행상황", route: "/(tabs)/progress" },
  { name: "커뮤니티", route: "/(tabs)/community" },
  { name: "설정", route: "/(tabs)/setting" },
];

type TabBarProps = {
  style?: ViewStyle;
};

const TabBar = ({ style }: TabBarProps) => {
  const pathname = usePathname();

  return (
    <View style={[styles.container, style]}>
      {TABS.map((tab) => {
        const isFocused = pathname.startsWith(tab.route);
        return (
          <Pressable
            key={tab.route}
            onPress={() => router.push(tab.route)}
            style={styles.tabItem}
          >
            <Text
              style={{
                color: isFocused ? colors.mainColor : colors.blackSub1,
                fontSize: 12,
              }}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    boxShadow: "-2px -2px 4px 1px rgba(221, 221, 221, 0.25)",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});
