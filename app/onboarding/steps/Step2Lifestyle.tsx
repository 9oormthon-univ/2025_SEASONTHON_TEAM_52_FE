import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

const QUESTIONS = [
  {
    key: "lifeCycle",
    question: "🛌 취침시간은 어떻게 되나요?",
    options: ["22시 이전", "22시~24시", "24시 이후"],
    enums: {
      "22시 이전": "MORNING",
      "22시~24시": "NORMAL",
      "24시 이후": "NIGHT_OWL",
    },
  },
  {
    key: "smoking",
    question: "🚬 흡연은 하시나요?",
    options: ["비흡연", "흡연"],
    enums: { 비흡연: "NON_SMOKER", 흡연: "SMOKER" },
  },
  {
    key: "cleanFreq",
    question: "🧹 청소주기는 어떻게 되나요?",
    options: ["자주", "1주일", "필요할때만"],
    enums: { 자주: "OFTEN", "1주일": "WEEKLY", 필요할때만: "WHEN_NEEDED" },
  },
  {
    key: "tidyLevel",
    question: "🫧 청결기준이 있나요?",
    options: ["엄격", "보통", "대충"],
    enums: { 엄격: "STRICT", 보통: "NORMAL", 대충: "RELAXED" },
  },
  {
    key: "visitorPolicy",
    question: "🙋‍♀️ 외부인 방문은 어떻게 생각하시나요?",
    options: ["가능", "제한적", "불가"],
    enums: { 가능: "ALLOWED", 제한적: "LIMITED", 불가: "FORBIDDEN" },
  },
];

export default function Step2Lifestyle({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();

  // 모든 질문에 답했는지 확인
  const allSelected = QUESTIONS.every((q) => answers.profileDto[q.key] !== "");

  return (
    <View style={styles.container}>
      <Text style={[TEXT.title1, styles.title]}>
        본인의 성향을{"\n"}자세하게 작성해봐요
      </Text>
      <Text style={[TEXT.body4, styles.subTitle]}>
        룸메이트 매칭 시 나와 더 잘 맞는 사람과 연결될 수 있어요{"\n"}
        {!allSelected && "*답변을 전부 해주셔야 다음페이지로 넘어가요"}
      </Text>

      {QUESTIONS.map((q) => (
        <View key={q.key} style={{ marginBottom: 16 }}>
          <Text style={TEXT.body2}>{q.question}</Text>
          <View style={styles.row}>
            {q.options.map((opt) => {
              const value = q.enums[opt] || opt;
              const isSelected = answers.profileDto[q.key] === value;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.option, isSelected && styles.selected]}
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      profileDto: {
                        ...prev.profileDto,
                        [q.key]: value,
                      },
                    }))
                  }
                >
                  <Text style={[TEXT.body3, isSelected && styles.selectedText]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      <TouchableOpacity
        disabled={!allSelected}
        style={[
          styles.nextBtn,
          !allSelected && { backgroundColor: colors.blackSub4 },
        ]}
        onPress={() => setStepNum((prev) => prev + 1)}
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
    marginTop: 6,
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
