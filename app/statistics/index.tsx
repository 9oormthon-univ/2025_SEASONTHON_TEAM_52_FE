import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState } from "react";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Statistics = () => {
  const rawData = [50, 35, 68, 46, 53, 78];
  const maxValue = Math.max(...rawData);
  const percentageData = rawData.map((v) => (v / maxValue) * 100);

  const BAR_AREA_HEIGHT = 120; // ✅ 막대 영역 높이
  const BAR_MAX = 100; // ✅ 막대 최대 값 (스케일링용)
  const REF_VALUE = 52; // ✅ 보조선 값
  const refTop = BAR_AREA_HEIGHT - (REF_VALUE / BAR_MAX) * BAR_AREA_HEIGHT;

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 31, flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.mainSub2,
          height: 136,
          borderRadius: 12,
        }}
      >
        <View style={{ paddingLeft: 30, paddingTop: 30, paddingBottom: 20 }}>
          <Text style={TEXT.body22}>20~40㎡ 청년 월세 현황</Text>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 44 }}
        >
          <View
            style={{ flexDirection: "row", gap: 10, alignItems: "flex-end" }}
          >
            <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
              중앙값 월세
            </Text>
            <Text style={[TEXT.body1, { color: colors.mainColor }]}>
              65만원
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", gap: 10, alignItems: "flex-end" }}
          >
            <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
              평균 월세
            </Text>
            <Text style={[TEXT.body1, { color: colors.mainColor }]}>
              100만원
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 99,
            marginTop: 47,
            marginBottom: 10,
          }}
        >
          <Text style={TEXT.body22}>면적대별 상세</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 24 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  backgroundColor: colors.subColor,
                }}
              />
              <Text style={TEXT.body4}>중앙값 월세</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 4,
                  backgroundColor: colors.mainColor,
                }}
              />
              <Text style={TEXT.body4}>평균 월세</Text>
            </View>
          </View>
        </View>

        <View style={[styles.barArea, { height: BAR_AREA_HEIGHT }]}>
          <View style={[styles.refLineContainer, { top: refTop }]}>
            <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>50</Text>
            <View style={styles.refLine} />
          </View>
          {/* 보조선 (뒤에 깔림) */}
          <View>
            <View style={[styles.group]}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    TEXT.body4,
                    { color: colors.blackSub1, paddingBottom: 20 },
                  ]}
                >
                  66
                </Text>
                <View style={[styles.blueBar, { height: 67 }]} />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    TEXT.body4,
                    { color: colors.blackSub1, paddingBottom: 10 },
                  ]}
                >
                  70
                </Text>
                <View style={[styles.redBar, { height: 77 }]} />
              </View>
            </View>
          </View>

          <View style={[styles.group]}>
            <View style={[styles.blueBar, { height: 68 }]} />
            <View style={[styles.redBar, { height: 80 }]} />
          </View>

          <View style={[styles.group]}>
            <View style={[styles.blueBar, { height: 82 }]} />
            <View style={[styles.redBar, { height: 96 }]} />
          </View>

          <View style={[styles.group]}>
            <View style={[styles.blueBar, { height: 88 }]} />
            <View style={[styles.redBar, { height: 88 }]} />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          marginTop: 16,
          marginBottom: 33,
        }}
      >
        <Text style={TEXT.body3}>20~25㎡</Text>
        <Text style={TEXT.body3}>25~30㎡</Text>
        <Text style={TEXT.body3}>30~35㎡</Text>
        <Text style={TEXT.body3}>35~40㎡</Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={TEXT.body22}>{`최근 월세 추세 (6개월)`}</Text>
        </View>

        <View style={[styles.barArea, { height: BAR_AREA_HEIGHT }]}>
          <View style={[styles.refLineContainer, { top: refTop }]}>
            <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>50</Text>
            <View style={[styles.refLine, { borderStyle: "dashed" }]} />
          </View>
          {/* 보조선 (뒤에 깔림) */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 48,
            }}
          >
            <View style={[styles.dot, { bottom: 60 }]} />
            <View style={[styles.dot, { bottom: 35 }]} />
            <View style={[styles.dot, { bottom: 58 }]} />
            <View style={[styles.dot, { bottom: 66 }]} />
            <View style={[styles.dot, { bottom: 75 }]} />
            <View style={[styles.dot, { bottom: 89 }]} />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 35,
          marginTop: 16,
          marginBottom: 33,
        }}
      >
        <Text style={TEXT.body3}>3월</Text>
        <Text style={TEXT.body3}>4월</Text>
        <Text style={TEXT.body3}>5월</Text>
        <Text style={TEXT.body3}>6월</Text>
        <Text style={TEXT.body3}>7월</Text>
        <Text style={TEXT.body3}>8월</Text>
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  redBar: {
    width: 12,
    backgroundColor: colors.mainColor,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  blueBar: {
    width: 12,
    backgroundColor: colors.subColor,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  barArea: {
    position: "relative", // ← 기준선 absolute 배치용
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: colors.blackSub2,
  },
  refLineContainer: {
    position: "absolute",
    left: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  refLine: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.blackSub3,
    marginRight: 15,
  },
  group: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    zIndex: 1, // 막대가 선 위에 보이도록
  },
  dot: {
    borderRadius: 10,
    borderColor: colors.mainColor,
    width: 8,
    height: 8,
    borderWidth: 1,
    backgroundColor: colors.mainColor,
  },
});
