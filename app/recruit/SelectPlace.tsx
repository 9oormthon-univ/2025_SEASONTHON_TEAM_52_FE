import { StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import Search_4 from "../../assets/svg/Search_4";
import { useState } from "react";
import React from "react";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import PrimaryButton from "../../components/PrimaryButton";
import Cross from "../../assets/svg/Cross";

const { height } = Dimensions.get("window");

const SelectPlace = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <View style={{ paddingTop: 50, flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.searchBar}>
          <TextInput
            style={[TEXT.body4, styles.input]}
            placeholder="지역을 선택해주세요"
            placeholderTextColor={colors.blackSub1}
            value={search}
            onChangeText={setSearch}
          />
          <Search_4 stroke={colors.blackSub1} width={28} height={28} />
        </View>
      </View>
      <View style={styles.bottomCard}>
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 35,
            marginBottom: 15,
            gap: 11,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[TEXT.body22, { color: colors.black }]}>
              서울시 영등포구 당산동
            </Text>
            <Cross stroke={colors.black} />
          </View>
          <Text style={[TEXT.body3, { color: colors.black, marginTop: 4 }]}>
            *오피스텔 평균 월세
            <Text style={{ color: colors.mainColor }}> 82만원</Text>
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton text="지역 선택하기" onPress={() => {}} />
        </View>
      </View>
    </>
  );
};

export default SelectPlace;

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    borderRadius: 12,
    boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    color: colors.black,
  },
  bottomCard: {
    width: "100%",
    height: 221,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    boxShadow: "-2px -2px 4px 0 rgba(0, 0, 0, 0.25)",
    position: "absolute", // ✅ absolute 배치
    bottom: 0, // ✅ 화면 하단에 고정
    left: 0,
    flex: 1,
  },
});
