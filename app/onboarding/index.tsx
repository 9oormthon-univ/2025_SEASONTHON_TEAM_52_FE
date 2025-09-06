// app/onboarding/index.tsx
import { JSX, useState, useEffect } from "react";
import { View } from "react-native";
import ProgressBar from "./ProgressBar";
import Step1MBTI from "./steps/Step1MBTI";
import Step2Lifestyle from "./steps/Step2Lifestyle";
import Step3Lifestyle from "./steps/Step3Lifestyle";
import Step4Details from "./steps/Step4Details";
import Step5Region from "./steps/Step5Region";
import { BackHandler } from "react-native";

const initialAnswers = {
  profileDto: {
    lifeCycle: "",
    smoking: "",
    cleanFreq: "",
    tidyLevel: "",
    visitorPolicy: "",
    restroomUsagePattern: "",
    foodOdorPolicy: "",
    homeStay: "",
    noisePreference: "",
    sleepSensitivity: "",
  },
  mbti: "",
  introduction: "",
  preferredLocationEmdCd: "",
};

export default function Onboarding() {
  const [stepNum, setStepNum] = useState(1);
  const [answers, setAnswers] = useState({ ...initialAnswers });

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
      <Step1MBTI
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
    2: (
      <Step2Lifestyle
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
    3: (
      <Step3Lifestyle
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
    4: (
      <Step4Details
        answers={answers}
        setAnswers={setAnswers}
        setStepNum={setStepNum}
      />
    ),
    5: (
      <Step5Region
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
      {stepComponents[stepNum]}
      {/* 버튼으로 step 이동 */}
      {/* <Button title="Next" onPress={() => setStepNum(stepNum + 1)} /> */}
    </View>
  );
}
