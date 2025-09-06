import { Slot } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChevronLeft from "../../assets/svg/ChevronLeft";
import { router } from "expo-router";
import { TEXT } from "../../constants/TextStyles";

export default function RecruitLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: 30, flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            marginLeft: 20,
          }}
        >
          <Pressable
            style={{ position: "absolute", left: 0, marginTop: 5 }}
            onPress={() => router.back()}
          >
            <ChevronLeft width={10} height={15} />
          </Pressable>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            모집글 작성하기
          </Text>
        </View>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
