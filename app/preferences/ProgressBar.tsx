import { View, StyleSheet, Pressable } from "react-native";
import colors from "../styles/colors";
import ChevronLeft from "../../assets/svg/ChevronLeft";
import { router } from "expo-router";

type Props = {
  current: number; // 현재 스텝 번호
  total: number; // 전체 스텝 수
};

export default function ProgressBar({ current, total }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft />
      </Pressable>
      {Array.from({ length: total }).map((_, idx) => {
        const step = idx + 1;
        const isActive = step <= current;
        return (
          <View
            key={step}
            style={[
              styles.bar,
              {
                backgroundColor: isActive ? colors.mainColor : colors.blackSub4,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 97.67,
    paddingHorizontal: 30,
    alignItems: "center",
    marginRight: 10,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  inactive: {
    backgroundColor: "#ddd",
  },
  active: {
    backgroundColor: "#FF6600", // 진행 색상
  },
  backButton: {
    marginRight: 12,
  },
});
