import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/AuthInput";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Checkbox from "expo-checkbox";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import { useRouter } from "expo-router"; // ⚠️ 테스트용: login page -> onboarding page

const AuthIndex = () => {
  const router = useRouter(); // ⚠️ 테스트용: login page -> onboarding page
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: 55, paddingBottom: 12 }}>
        <Text style={[TEXT.logo, { fontSize: 48 }]}>오손도손</Text>
      </View>
      <View style={{ gap: 6, flexDirection: "column", paddingBottom: 12 }}>
        <Text style={TEXT.head2}>{`안녕하세요 :)`}</Text>
        <Text style={TEXT.head2}>오손도손입니다</Text>
      </View>
      <Text style={[TEXT.body2, { color: "#8C8C8C", paddingBottom: 72 }]}>
        회원 서비스 이용을 위해 로그인 해주세요
      </Text>
      <View style={{ gap: 12, flexDirection: "column" }}>
        <AuthInput placeholder="아이디 입력" value={id} onChangeText={setId} />
        <AuthInput
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingTop: 22,
          paddingBottom: 28,
        }}
      >
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.mainColor : undefined}
        />
        <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>
          자동 로그인
        </Text>
      </View>
      <PrimaryButton
        text="로그인"
        onPress={async () => {
          await fetch("http://13.209.184.54:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "두둥탁10" }),
          });

          const profileData = await fetch(
            "http://13.209.184.54:8080/auth/profile",
            {
              method: "GET",
            }
          );
          console.log(profileData ? "true" : "false");
          const data2 = await profileData.json();
          console.log("프로필 에러?", data2.status === 400);
          if (data2.status === 400) router.push("/onboarding");
          else router.push("(tabs)/(home)");
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: -17,
        }}
      >
        <Pressable>
          <Text style={styles.text}>아이디 찾기</Text>
        </Pressable>
        <View
          style={{
            width: 2,
            height: 12,
            backgroundColor: "#d8d8d8",
            marginHorizontal: 12,
          }}
        />
        <Pressable>
          <Text style={styles.text}>비밀번호 찾기</Text>
        </Pressable>
        <View
          style={{
            width: 2,
            height: 12,
            backgroundColor: "#d8d8d8",
            marginHorizontal: 12,
          }}
        />
        <Pressable>
          <Text style={styles.text}>회원가입</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <View
          style={{ backgroundColor: colors.blackSub4, height: 1, flex: 1 }}
        />
        <Text style={[styles.text, { color: colors.blackSub3 }]}>또는</Text>
        <View
          style={{ backgroundColor: colors.blackSub4, height: 1, flex: 1 }}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Pressable style={styles.google}>
          <Image
            source={require("../../assets/icon/Google.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text
            style={[TEXT.body3, { color: colors.black, paddingVertical: 11 }]}
          >
            구글 로그인
          </Text>
        </Pressable>
        <Pressable
          style={styles.naver}
          onPress={() => router.push("(tabs)/(home)")}
        >
          <Image
            source={require("../../assets/icon/Naver.png")}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={[
              TEXT.body3,
              { color: colors.blackSub5, paddingVertical: 11 },
            ]}
          >
            네이버 로그인
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AuthIndex;

const styles = StyleSheet.create({
  text: {
    color: "#8c8c8c",
    fontSize: 14,
    lineHeight: 72,
    letterSpacing: -0.35,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: "#d8d8d8",
  },
  naver: {
    borderRadius: 8,
    backgroundColor: "#21cb01",
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 29,
  },
  google: {
    borderRadius: 8,
    borderColor: colors.blackSub3,
    height: 46,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 29,
  },
});
