import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";
import Checkbox from "expo-checkbox";

const QUESTIONS = [
  {
    key: "lifeCycleValue",
    question: "🛌 취침시간은 어떻게 되나요?",
    options: ["22시 이전", "22시~24시", "24시 이후"],
    requiredField: "lifeCycleRequired",
    enums: {
      "22시 이전": "MORNING",
      "22시~24시": "NORMAL",
      "24시 이후": "NIGHT_OWL",
    },
  },
  {
    key: "smokingValue",
    question: "🚬 흡연은 하시나요?",
    options: ["비흡연", "흡연"],
    requiredField: "smokingRequired",
    enums: { 비흡연: "NON_SMOKER", 흡연: "SMOKER" },
  },
  {
    key: "cleanFreqValue",
    question: "🧹 청소주기는 어떻게 되나요?",
    options: ["자주", "1주일", "필요할때만"],
    requiredField: "cleanFreqRequired",
    enums: { 자주: "OFTEN", "1주일": "WEEKLY", 필요할때만: "WHEN_NEEDED" },
  },
  {
    key: "tidyLevelValue",
    question: "🫧 청결기준이 있나요?",
    options: ["엄격", "보통", "대충"],
    requiredField: "tidyLevelRequired",
    enums: { 엄격: "STRICT", 보통: "NORMAL", 대충: "RELAXED" },
  },
  {
    key: "visitorPolicyValue",
    question: "🙋‍♀️ 외부인 방문은 어떻게 생각하시나요?",
    options: ["가능", "제한적", "불가"],
    requiredField: "visitorPolicyRequired",
    enums: { 가능: "ALLOWED", 제한적: "LIMITED", 불가: "FORBIDDEN" },
  },
];

export default function PrefStep1({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
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
          <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
            <Text style={TEXT.body2}>{q.question}</Text>
            <Pressable
              style={styles.checkRow}
              onPress={() =>
                setAnswers((prev) => ({
                  ...prev,
                  [q.requiredField]: !answers[q.requiredField],
                }))
              }
            >
              <Text style={TEXT.body2}>필수</Text>
              <Checkbox
                style={{ borderRadius: 5, borderColor: colors.blackSub2 }}
                value={answers[q.requiredField]}
                onValueChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.requiredField]: !answers[q.requiredField],
                  }))
                }
                color={answers[q.requiredField] ? colors.mainColor : undefined}
              />
            </Pressable>
          </View>
          <View style={styles.row}>
            {q.options.map((opt) => {
              const value = q.enums[opt] || opt;
              const isSelected = answers[q.key] === value;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.option, isSelected && styles.selected]}
                  onPress={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q.key]: value,
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
        disabled={QUESTIONS.some((q) => answers[q.key] === "")}
        style={[
          styles.nextBtn,
          QUESTIONS.some((q) => answers[q.key] === "") && {
            backgroundColor: colors.blackSub4,
          },
        ]}
        onPress={() => setStepNum((prev) => prev + 1)}
      >
        <Text
          style={[
            TEXT.body22,
            {
              color: !QUESTIONS.some((q) => answers[q.key] === "")
                ? colors.white
                : colors.blackSub1,
            },
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
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
