import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";
import Checkbox from "expo-checkbox";

const QUESTIONS = [
  {
    key: "restroomUsagePatternValue",
    question: "🛀 욕실은 언제 자주 사용하나요?",
    options: ["아침위주", "저녁위주", "유동적"],
    requiredField: "restroomUsagePatternRequired",
    enums: {
      아침위주: "MORNING_SHOWER",
      저녁위주: "EVENING_SHOWER",
      유동적: "FLEXIBLE",
    },
  },
  {
    key: "foodOdorPolicyValue",
    question: "🍜 집에서 음식냄새는 허용하나요?",
    options: ["허용", "주의", "불가"],
    requiredField: "foodOdorPolicyRequired",
    enums: {
      허용: "ALLOWED",
      주의: "CAREFUL",
      불가: "FORBIDDEN",
    },
  },
  {
    key: "homeStayValue",
    question: "🏠 집에 머무는 시간은 어떻게 되나요?",
    options: ["대부분 외출", "반반", "대부분 재택"],
    requiredField: "homeStayRequired",
    enums: {
      "대부분 외출": "MOSTLY_OUT",
      반반: "HALF_AND_HALF",
      "대부분 재택": "MOSTLY_HOME",
    },
  },
  {
    key: "noisePreferenceValue",
    question: "🤫 이 시간은 조용하면 좋겠다. 라고 생각하는 시간이 있나요?",
    options: ["항상 조용", "22시 ~ 07시 조용", "크게 무관"],
    requiredField: "noisePreferenceRequired",
    enums: {
      "항상 조용": "ALWAYS_QUIET",
      "22시 ~ 07시 조용": "QUIET_AT_NIGHT",
      "크게 무관": "FLEXIBLE",
    },
  },
  {
    key: "sleepSensitivityValue",
    question: "💤 수면에 민감한 부분이 있나요?",
    requiredField: "sleepSensitivityRequired",
    options: ["예민", "보통", "둔함"],
    enums: {
      예민: "SENSITIVE",
      보통: "NORMAL",
      둔함: "DEEP_SLEEPER",
    },
  },
];

export default function PrefStep2({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();

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
        onPress={async () => {
          await fetch("http://13.209.184.54:8080/desired-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
          });
          router.push("(tabs)/(home)");
        }}
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
          완료!
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
