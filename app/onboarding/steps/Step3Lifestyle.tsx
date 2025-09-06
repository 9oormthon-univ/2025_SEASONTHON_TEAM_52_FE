import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

const QUESTIONS = [
  {
    key: "restroomUsagePattern",
    question: "🛀 욕실은 언제 자주 사용하나요?",
    options: ["아침위주", "저녁위주", "유동적"],
    enums: {
      아침위주: "MORNING_SHOWER",
      저녁위주: "EVENING_SHOWER",
      유동적: "FLEXIBLE",
    },
  },
  {
    key: "foodOdorPolicy",
    question: "🍜 집에서 음식냄새는 허용하나요?",
    options: ["허용", "주의", "불가"],
    enums: {
      허용: "ALLOWED",
      주의: "CAREFUL",
      불가: "FORBIDDEN",
    },
  },
  {
    key: "homeStay",
    question: "🏠 집에 머무는 시간은 어떻게 되나요?",
    options: ["대부분 외출", "반반", "대부분 재택"],
    enums: {
      "대부분 외출": "MOSTLY_OUT",
      반반: "HALF_AND_HALF",
      "대부분 재택": "MOSTLY_HOME",
    },
  },
  {
    key: "noisePreference",
    question: "🤫 이 시간은 조용하면 좋겠다. 라고 생각하는 시간이 있나요?",
    options: ["항상 조용", "22시 ~ 07시 조용", "크게 무관"],
    enums: {
      "항상 조용": "ALWAYS_QUIET",
      "22시 ~ 07시 조용": "QUIET_AT_NIGHT",
      "크게 무관": "FLEXIBLE",
    },
  },
  {
    key: "sleepSensitivity",
    question: "💤 수면에 민감한 부분이 있나요?",
    options: ["예민", "보통", "둔함"],
    enums: {
      예민: "SENSITIVE",
      보통: "NORMAL",
      둔함: "DEEP_SLEEPER",
    },
  },
];

export default function Step3Lifestyle({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();

  // profileDto 내부 값들이 모두 채워졌는지 확인
  const allSelected = QUESTIONS.every((q) => answers.profileDto[q.key] !== "");

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
