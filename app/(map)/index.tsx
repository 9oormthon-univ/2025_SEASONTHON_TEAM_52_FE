// app/(region)/select.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import SeoulMap from "../../components/SeoulMap"; // 👈 방금 만든 지도 컴포넌트 import
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";

export default function RegionSelect() {
  const [selectedGu, setSelectedGu] = useState<string | null>(null);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* 상단 헤더 */}
      <Text style={[TEXT.body22, styles.headerTitle]}>지역 선택</Text>

      {/* 지도 */}
      <View style={styles.mapWrapperWrapper}>
        <View style={styles.mapWrapper}>
          <SeoulMap selected={selectedGu} onSelect={setSelectedGu} />
        </View>
      </View>

      {/* 지역 선택 결과 */}
      <View style={styles.section}>
        <Text style={TEXT.body4}>원하시는 지역을 한 곳 선택해주세요!</Text>
        <View style={styles.selectedBox}>
          <Text style={[TEXT.body1, { color: colors.mainColor }]}>
            {selectedGu || "지역을 선택해주세요"}
          </Text>
        </View>
      </View>

      {/* 탐색 범위 */}
      <View style={styles.section}>
        <Text style={[TEXT.body3, { marginBottom: 12 }]}>탐색범위</Text>
        <View style={styles.exploreRow}>
          <View style={styles.exploreBox}>
            <Text style={TEXT.body3}>선택한 동네</Text>
            <Text style={[TEXT.body1, { color: colors.mainColor }]}>
              {selectedGu || "-"}
            </Text>
          </View>
          <View style={styles.exploreBox}>
            <Text style={TEXT.body3}>인접한 동네</Text>
            <Text style={[TEXT.body1, { color: colors.mainColor }]}>
              {selectedGu ? "동작구" : "-"} {/* TODO: 실제 인접 구 계산 */}
            </Text>
          </View>
        </View>
      </View>

      {/* 완료 버튼 */}
      <TouchableOpacity
        style={[
          styles.ctaBtn,
          !selectedGu && { backgroundColor: colors.blackSub2 },
        ]}
        disabled={!selectedGu}
        onPress={() => {
          // 선택된 지역으로 이동하거나 상태 저장
          router.back();
        }}
      >
        <Text style={styles.ctaText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  headerTitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  mapWrapperWrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 360,
    height: 320,
    marginBottom: 20,
  },
  mapWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  section: {
    marginTop: 12,
    marginBottom: 20,
  },
  selectedBox: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFF5EC",
  },
  exploreRow: {
    flexDirection: "row",
    gap: 12,
  },
  exploreBox: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  ctaBtn: {
    backgroundColor: colors.mainColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
