import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";

export default function Step4FreeText({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const [text, setText] = useState(answers.freeText || "");

  const handleNext = () => {
    setAnswers((prev) => ({ ...prev, freeText: text }));
    setStepNum((prev) => prev + 1);
  };

  const handleSkip = () => {
    setAnswers((prev) => ({ ...prev, freeText: "" }));
    setStepNum((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={[TEXT.title1, styles.title]}>
        앞에 없었던{"\n"}성향이 있다면 작성해 주세요!
      </Text>
      <Text style={[TEXT.body4, styles.subTitle]}>
        생활패턴을 자유롭게 작성해주세요 :)
      </Text>

      <TextInput
        style={[TEXT.body3, styles.input]}
        value={text}
        onChangeText={setText}
        placeholder="예: 미니멀리즘을 추구해서 깨끗한 분위면 좋겠어요"
        placeholderTextColor={colors.blackSub2}
        multiline
      />

      <View style={styles.btnRow}>
        {text.length === 0 && (
          <TouchableOpacity style={[styles.skipBtn]} onPress={handleSkip}>
            <Text style={[TEXT.body22, { color: colors.blackSub1 }]}>
              건너뛰기
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={[TEXT.body22, { color: colors.white }]}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { textAlign: "left" },
  subTitle: {
    color: colors.blackSub1,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    minHeight: 300,
    maxHeight: 360,
    borderRadius: 20,
    backgroundColor: colors.blackSub5,
    padding: 30,
    textAlignVertical: "top",
    marginTop: 100,
    marginBottom: 20,
  },
  btnRow: {
    marginTop: "auto",
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skipBtn: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: colors.blackSub4,
    alignItems: "center",
  },
  nextBtn: {
    flex: 1.75,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: colors.mainColor,
    alignItems: "center",
  },
});
