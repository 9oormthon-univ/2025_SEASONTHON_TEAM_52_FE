// components/TabBar.tsx
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { router, useSegments } from "expo-router";
import colors from "../app/styles/colors";
import Home_10 from "../assets/svg/Home_10";
import Comment_Alt_Lines from "../assets/svg/Comment_Alt_Lines";
import Spinner from "../assets/svg/Spinner";
import Link_2 from "../assets/svg/Link_2";
import Setting_5 from "../assets/svg/Setting_5";

const TABS = [
  { name: "홈", route: "/(tabs)/(home)", icon: Home_10 },
  { name: "매칭", route: "/(tabs)/(matching)", icon: Link_2 },
  { name: "진행상황", route: "/(tabs)/(progress)", icon: Spinner },
  { name: "커뮤니티", route: "/(tabs)/(community)", icon: Comment_Alt_Lines },
  { name: "설정", route: "/(tabs)/(setting)", icon: Setting_5 },
];

type TabBarProps = {
  style?: ViewStyle;
};

const TabBar = ({ style }: TabBarProps) => {
  const segments = useSegments();
  const current = segments[1];
  return (
    <View style={[styles.container, style]}>
      {TABS.map((tab) => {
        const Icon = tab.icon; // 아이콘 컴포넌트
        const isFocused = tab.route.includes(current);
        return (
          <Pressable
            key={tab.route}
            onPress={() => router.push(tab.route)}
            style={styles.tabItem}
          >
            <Icon
              width={24}
              height={24}
              stroke={isFocused ? colors.mainColor : colors.blackSub1}
            />
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
    paddingInline: 15,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    boxShadow: "-2px -2px 4px 1px rgba(221, 221, 221, 0.25)",
  },
  tabItem: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
