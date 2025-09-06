import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import PrefStep1 from "./steps/PrefStep1";
import PrefStep2 from "./steps/PrefStep2";
import { JSX, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function OnboardingStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const stepNum = Number(step);

  const stepComponents: Record<number, JSX.Element> = {
    1: <PrefStep1 answers={answers} setAnswers={setAnswers} />,
    2: <PrefStep2 answers={answers} setAnswers={setAnswers} />,
  };
  const TOTAL_STEPS = Object.keys(stepComponents).length;

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar current={stepNum} total={TOTAL_STEPS} />
      {stepComponents[stepNum] || (
        <PrefStep1 answers={answers} setAnswers={setAnswers} />
      )}
    </View>
  );
}
