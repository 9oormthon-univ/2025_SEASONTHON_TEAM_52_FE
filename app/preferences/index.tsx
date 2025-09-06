import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import PrefStep1 from "./steps/PrefStep1";
import PrefStep2 from "./steps/PrefStep2";
import { JSX, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { BackHandler } from "react-native";

const emptyAnswer = {
  lifeCycleValue: "",
  lifeCycleRequired: false,
  smokingValue: "",
  smokingRequired: false,
  cleanFreqValue: "",
  cleanFreqRequired: false,
  tidyLevelValue: "",
  tidyLevelRequired: false,
  visitorPolicyValue: "",
  visitorPolicyRequired: false,
  restroomUsagePatternValue: "",
  restroomUsagePatternRequired: false,
  foodOdorPolicyValue: "",
  foodOdorPolicyRequired: false,
  homeStayValue: "",
  homeStayRequired: false,
  noisePreferenceValue: "",
  noisePreferenceRequired: false,
  sleepSensitivityValue: "",
  sleepSensitivityRequired: false,
};
export default function OnboardingStep() {
  const [stepNum, setStepNum] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string | boolean }>(
    emptyAnswer
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (stepNum > 1) setStepNum((prev) => prev - 1);
        // true를 return하면 기본 동작(뒤로 가기)을 막음
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const stepComponents: Record<number, JSX.Element> = {
    1: (
      <PrefStep1
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
    2: (
      <PrefStep2
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
  };
  const TOTAL_STEPS = Object.keys(stepComponents).length;

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar current={stepNum} total={TOTAL_STEPS} />
      {stepComponents[stepNum] || (
        <PrefStep1
          answers={answers}
          setAnswers={setAnswers}
          setStepNum={setStepNum}
        />
      )}
    </View>
  );
}
