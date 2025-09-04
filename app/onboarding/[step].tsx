import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Step1MBTI from "./steps/Step1MBTI";
import Step2Lifestyle from "./steps/Step2Lifestyle";
import { JSX, useState } from "react";
import ProgressBar from "./ProgressBar";
import Step3Lifestyle from "./steps/Step3Lifestyle";
import Step4Details from "./steps/Step4Details";
import Step5Region from "./steps/Step5Region";

export default function OnboardingStep() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const stepNum = Number(step);

  const stepComponents: Record<number, JSX.Element> = {
    1: <Step1MBTI answers={answers} setAnswers={setAnswers} />,
    2: <Step2Lifestyle answers={answers} setAnswers={setAnswers} />,
    3: <Step3Lifestyle answers={answers} setAnswers={setAnswers} />,
    4: <Step4Details answers={answers} setAnswers={setAnswers} />,
    5: <Step5Region answers={answers} setAnswers={setAnswers} />,
  };
  const TOTAL_STEPS = Object.keys(stepComponents).length;

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar current={stepNum} total={TOTAL_STEPS} />
      {stepComponents[stepNum] || (
        <Step1MBTI answers={answers} setAnswers={setAnswers} />
      )}
    </View>
  );
}
