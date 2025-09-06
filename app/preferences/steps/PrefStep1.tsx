import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

const QUESTIONS = [
  {
    key: "sleep",
    question: "🛌 취침시간은 어떻게 되나요?",
    options: ["22시 이전", "22시~24시", "24시 이후", "유동적"],
  },
  {
    key: "smoking",
    question: "🚬 흡연은 하시나요?",
    options: ["비흡연", "흡연"],
  },
  {
    key: "cleaning",
    question: "🧹 청소주기는 어떻게 되나요?",
    options: ["자주", "1주일", "필요할때만"],
  },
  {
    key: "pet",
    question: "🫧 청결기준이 있나요?",
    options: ["엄격", "보통", "대충"],
  },
  {
    key: "guest",
    question: "🙋‍♀️ 외부인 방문은 어떻게 생각하시나요?",
    options: ["가능", "제한적", "불가"],
  },
];

export default function PrefStep1({
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
        {`원하는 룸메이트의\n성향을 선택해주세요 :)`}
      </Text>
      <View style={{ marginBottom: 33.37 }}>
        <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
          룸메이트 매칭 시 나와 더 잘 맞는 사람과 연결될 수 있어요
        </Text>
        <Text style={[TEXT.body4, { color: colors.mainColor }]}>
          "*답변을 전부 해주셔야 다음페이지로 넘어가요"
        </Text>
      </View>
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
        onPress={() => router.push("/preferences/2")}
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
