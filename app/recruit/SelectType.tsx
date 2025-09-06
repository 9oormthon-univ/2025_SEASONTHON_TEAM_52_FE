import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import Home_10 from "../../assets/svg/Home_10";

type TypeChoice = "orange" | "blue" | null;

const SelectType = () => {
  const [selected, setSelected] = useState<TypeChoice>(null);

  const toggle = (key: TypeChoice) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  const isOrangeActive = selected === "orange";
  const isBlueActive = selected === "blue";

  return (
    <>
      <View style={{ paddingTop: 100, flex: 1, paddingHorizontal: 20 }}>
        <View style={{ gap: 13 }}>
          <Text style={TEXT.head2}>{`어떤 룸메이트를\n모집하나요?`}</Text>
          <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
            {`같이 새 집을 구할지, 내 방에 들어올\n룸메이트를 찾을지 골라주세요.`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            paddingRight: 10,
            marginTop: 60,
          }}
        >
          {/* ORANGE */}
          <Pressable
            style={[
              styles.typeCard,
              {
                gap: 40,
                borderColor: isOrangeActive
                  ? colors.mainColor
                  : colors.blackSub4,
                backgroundColor: isOrangeActive
                  ? colors.mainSub1
                  : "transparent",
              },
            ]}
            onPress={() => toggle("orange")}
          >
            <Image
              source={require("../../assets/icon/OrangePuzzle.png")}
              style={{ width: 157, height: 147 }}
            />
            <Text style={[TEXT.body1, { color: colors.blackSub1 }]}>
              같이 방을 구해요
            </Text>
          </Pressable>

          {/* BLUE */}
          <Pressable
            style={[
              styles.typeCard,
              {
                gap: 47,
                borderColor: isBlueActive ? colors.subColor : colors.blackSub4,
                backgroundColor: isBlueActive
                  ? colors.subColor2
                  : "transparent",
              },
            ]}
            onPress={() => toggle("blue")}
          >
            <Image
              source={require("../../assets/icon/BluePuzzle.png")}
              style={{ width: 134, height: 141 }}
            />
            <Text style={[TEXT.body1, { color: colors.blackSub1 }]}>
              이미 방이 있어요
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: "auto", paddingHorizontal: 20 }}>
        <PrimaryButton
          text="다음"
          active={selected !== null}
          onPress={() => router.push("/recruit/RcWrite")}
        />
      </View>
    </>
  );
};

export default SelectType;

const styles = StyleSheet.create({
  typeCard: {
    height: 282,
    width: "50%",
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    paddingTop: 34,
  },
});
