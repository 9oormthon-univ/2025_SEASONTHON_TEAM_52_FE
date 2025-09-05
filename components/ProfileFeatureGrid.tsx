import React from "react";
import { View, StyleSheet } from "react-native";
import FeatureBox from "./FeatureBox";

//enum 확인하기
const LIFE_CYCLE_MAP: Record<string, string> = {
  MORNING: "아침형",
  EVENING: "저녁형",
  BOTH: "유동적",
};

const SMOKING_MAP: Record<string, string> = {
  NON_SMOKER: "비흡연",
  SMOKER: "흡연",
};

const CLEAN_FREQ_MAP: Record<string, string> = {
  OFTEN: "자주 정리",
  SOMETIMES: "가끔 정리",
  RARELY: "드물게 정리",
};

const TIDY_LEVEL_MAP: Record<string, string> = {
  STRICT: "깔끔함 선호",
  NORMAL: "보통",
  LOW: "자유로움",
};

export type ProfileFeatureProps = {
  lifeCycle: keyof typeof LIFE_CYCLE_MAP;
  smoking: keyof typeof SMOKING_MAP;
  cleanFreq: keyof typeof CLEAN_FREQ_MAP;
  tidyLevel: keyof typeof TIDY_LEVEL_MAP;
};

export default function ProfileFeatureGrid({
  lifeCycle,
  smoking,
  cleanFreq,
  tidyLevel,
}: ProfileFeatureProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <FeatureBox
          label="주요 활동 시간대"
          value={LIFE_CYCLE_MAP[lifeCycle]}
        />
        <FeatureBox label="정리 습관" value={TIDY_LEVEL_MAP[tidyLevel]} />
      </View>
      <View style={styles.row}>
        <FeatureBox label="흡연 여부" value={SMOKING_MAP[smoking]} />
        <FeatureBox label="선호 소음도" value={CLEAN_FREQ_MAP[cleanFreq]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
