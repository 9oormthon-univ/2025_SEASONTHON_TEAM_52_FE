import React from "react";
import { View, StyleSheet } from "react-native";
import FeatureBox from "./FeatureBox";

//enum 확인하기
const LIFE_CYCLE_MAP: Record<string, string> = {
  MORNING: "아침형",
  NORMAL: "유동적",
  NIGHT_OWL: "저녁형",
};

const SMOKING_MAP: Record<string, string> = {
  NON_SMOKER: "비흡연",
  SMOKER: "흡연",
};

const Noise_Preference: Record<string, string> = {
  ALWAYS_QUIET: "항상 조용",
  QUIET_AT_NIGHT: "밤에는 조용",
  FLEXIBLE: "크게 무관",
};

const TIDY_LEVEL_MAP: Record<string, string> = {
  STRICT: "엄격",
  NORMAL: "보통",
  RELAXED: "대충",
};

export type ProfileFeatureProps = {
  lifeCycle: keyof typeof LIFE_CYCLE_MAP;
  smoking: keyof typeof SMOKING_MAP;
  noisePreference: keyof typeof Noise_Preference;
  tidyLevel: keyof typeof TIDY_LEVEL_MAP;
};

export default function ProfileFeatureGrid({
  lifeCycle,
  smoking,
  noisePreference,
  tidyLevel,
}: ProfileFeatureProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <FeatureBox
          label="주요 활동 시간대"
          value={LIFE_CYCLE_MAP[lifeCycle]}
        />
        <FeatureBox label="청결 기준" value={TIDY_LEVEL_MAP[tidyLevel]} />
      </View>
      <View style={styles.row}>
        <FeatureBox label="흡연 여부" value={SMOKING_MAP[smoking]} />
        <FeatureBox
          label="선호 소음도"
          value={Noise_Preference[noisePreference]}
        />
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
