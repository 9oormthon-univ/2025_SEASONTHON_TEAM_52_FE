import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

const QUESTIONS = [
  {
    key: "bath",
    question: "🛀 욕실은 언제 자주 사용하나요?",
    options: ["아침위주", "저녁위주", "유동적"],
  },
  {
    key: "foodSmell",
    question: "🍜 집에서 음식냄새는 허용하나요?",
    options: ["허용", "주의", "불가"],
  },
  {
    key: "staying",
    question: "🏠 집에 머무는 시간은 어떻게 되나요?",
    options: ["대부분 외출", "반반", "대부분 재택"],
  },
  {
    key: "silence",
    question: "🤫 이 시간은 조용하면 좋겠다. 라고 생각하는 시간이 있나요?",
    options: ["항상 조용", "22시 ~ 07시 조용", "크게 무관"],
  },
  {
    key: "sensetive",
    question: "💤 수면에 민감한 부분이 있나요?",
    options: ["예민", "보통", "둔함"],
  },
];

export default function Step3Lifestyle({
  answers,
  setAnswers,
}: {
  answers: { [key: string]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}) {
  const router = useRouter();

  const allSelected = Object.keys(answers).length === QUESTIONS.length;

  return (
    <View style={styles.container}>
      <Text style={[TEXT.title1, styles.title]}>
        본인의 성향을{"\n"}자세하게 작성해봐요
      </Text>
      <Text style={[TEXT.body4, styles.subTitle]}>
        거의 다 왔어요! 자세하게 적을 수록 매칭률이 올라가요!{"\n "}
      </Text>
      {QUESTIONS.map((q) => (
        <View key={q.key} style={{ marginBottom: 16 }}>
          <Text style={TEXT.body2}>{q.question}</Text>
          <View style={styles.row}>
            {q.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.option,
                  answers[q.key] === opt && styles.selected,
                ]}
                onPress={() =>
                  setAnswers((prev) => ({ ...prev, [q.key]: opt }))
                }
              >
                <Text
                  style={[
                    TEXT.body3,
                    answers[q.key] === opt && styles.selectedText,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <TouchableOpacity
        disabled={!allSelected}
        style={[
          styles.nextBtn,
          !allSelected && { backgroundColor: colors.blackSub4 },
        ]}
        onPress={() => router.push("/onboarding/4")}
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
    gap: 10,
  },
  title: {
    textAlign: "left",
  },
  subTitle: {
    color: colors.blackSub1,
    textAlign: "left",
    marginBottom: 10,
  },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blackSub4,
    marginRight: 8,
  },
  selected: {
    backgroundColor: colors.mainSub1,
    borderColor: colors.mainSub1,
  },
  selectedText: { color: colors.mainColor },
  nextBtn: {
    marginTop: "auto",
    marginBottom: 40,
    paddingVertical: 14,
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    alignItems: "center",
  },
});
