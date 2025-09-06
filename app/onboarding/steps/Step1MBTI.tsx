import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

const MBTI_OPTIONS = [
  {
    group: "EI",
    items: [
      { value: "E", label: "E 외향형", sub: "단체 활동을 선호하는" },
      { value: "I", label: "I 내향형", sub: "혼자하는 활동을 선호하는" },
    ],
  },
  {
    group: "SN",
    items: [
      { value: "S", label: "S 감각형", sub: "실용적이고 현실적인" },
      { value: "N", label: "N 직관형", sub: "미래지향적이며 이상적인" },
    ],
  },
  {
    group: "TF",
    items: [
      { value: "T", label: "T 사고형", sub: "논리와 사실을 중시하는" },
      { value: "F", label: "F 감정형", sub: "사람과 감정을 중시하는" },
    ],
  },
  {
    group: "PJ",
    items: [
      { value: "P", label: "P 인식형", sub: "유연하며 즉흥적인" },
      { value: "J", label: "J 판단형", sub: "계획적이며 체계적인" },
    ],
  },
];

export default function Step1MBTI({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const allSelected = Object.keys(selected).length === MBTI_OPTIONS.length;

  const handleSelect = (group: string, value: string) => {
    setSelected((prev) => ({ ...prev, [group]: value }));
  };
  const handleNext = () => {
    // 선택된 값들을 MBTI 순서대로 이어붙임
    const mbti = MBTI_OPTIONS.map((opt) => selected[opt.group]).join("");

    console.log("selected MBTI:", mbti);
    // answers.mbti 업데이트
    setAnswers((prev) => ({
      ...prev,
      mbti,
    }));

    setStepNum((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={[TEXT.title1, styles.title]}>
        본인의 MBTI를 알려주면{"\n"}생활패턴 성향 선택을 도와드려요 :)
      </Text>

      <View style={styles.contents}>
        {MBTI_OPTIONS.map(({ group, items }) => {
          const selectedVal = selected[group];
          return (
            <View key={group} style={styles.toggleGroup}>
              {items.map((item, idx) => {
                const isActive = selectedVal === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.option,
                      isActive ? styles.active : styles.inactive,
                      idx === 0 && styles.leftRadius,
                      idx === 1 && styles.rightRadius,
                    ]}
                    onPress={() => handleSelect(group, item.value)}
                  >
                    <Text
                      style={[
                        TEXT.title1,
                        styles.label,
                        isActive && { color: colors.white },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={[
                        TEXT.body3,
                        { color: isActive ? colors.white : colors.blackSub1 },
                      ]}
                    >
                      {item.sub}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        disabled={!allSelected}
        style={[
          styles.nextBtn,
          !allSelected && { backgroundColor: colors.blackSub4 },
        ]}
        onPress={handleNext}
      >
        <Text
          style={[
            TEXT.body22,
            { color: allSelected ? colors.white : colors.blackSub1 },
          ]}
        >
          다음
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    marginBottom: 24,
    textAlign: "left",
  },
  contents: {
    marginTop: 40,
  },
  toggleGroup: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.blackSub5,
    marginBottom: 16,
  },
  option: {
    flex: 1,
    height: 102,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  leftRadius: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderLeftWidth: 0,
  },
  rightRadius: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderRightWidth: 0,
  },
  inactive: {
    backgroundColor: colors.blackSub5,
    borderLeftColor: colors.blackSub4,
    borderLeftWidth: 1,
    borderRightColor: colors.blackSub4,
    borderRightWidth: 1,
  },
  active: {
    backgroundColor: colors.mainColor,
  },
  label: {
    color: colors.black,
    marginBottom: 4,
  },
  nextBtn: {
    marginTop: "auto",
    marginBottom: 40,
    paddingVertical: 14,
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    alignItems: "center",
  },
});
