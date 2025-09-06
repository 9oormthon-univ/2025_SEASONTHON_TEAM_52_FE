import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";
import { Ionicons } from "@expo/vector-icons";

const MOCK_REGIONS = {
  "강남구 대치동": 11680106,
  "강남구 개포동": 11680103,
  "강남구 세곡동": 11680111,
  "강남구 신사동": 11680107,
  "강남구 압구정동": 11680110,
  "강남구 율현동": 11680113,
  "강남구 일원동": 11680114,
  "강남구 자곡동": 11680112,
  "강남구 수서동": 11680115,
  "강남구 삼성동": 11680105,
  "강남구 논현동": 11680108,
  "강남구 역삼동": 11680101,
  "강남구 청담동": 11680104,
  "강남구 도곡동": 11680118,
  "광진구 자양동": 11215105,
  "광진구 구의동": 11215103,
  "광진구 화양동": 11215107,
  "광진구 능동": 11215102,
  "광진구 광장동": 11215104,
  "광진구 군자동": 11215109,
  "광진구 중곡동": 11215101,
};

export default function Step5Region({
  answers,
  setAnswers,
  setStepNum,
}: {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setStepNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const filtered = Object.keys(MOCK_REGIONS).filter((r) => r.includes(query));

  const handleSelect = (preferredLocationEmdCd: string) => {
    setSelected(preferredLocationEmdCd);
    setAnswers((prev: any) => ({
      ...prev,
      preferredLocationEmdCd: MOCK_REGIONS[preferredLocationEmdCd],
    }));
  };

  const handleRemove = () => {
    setSelected(null);
    setAnswers((prev: any) => ({
      ...prev,
      preferredLocationEmdCd: "",
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={[TEXT.title1, styles.title]}>
        룸메이트를 구할{"\n"}지역을 선택해주세요!
      </Text>
      <Text style={[TEXT.body4, styles.subTitle]}>
        지역을 토대로 원하는 장소에서 룸메이트를 매칭해드려요!
      </Text>

      {/* 검색창 */}
      <View style={styles.searchBox}>
        <TextInput
          style={[TEXT.body3, styles.input]}
          placeholder="구, 동네명 검색 예) 영등포구, 당산동"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={colors.blackSub1}
        />
        <Ionicons
          name="search"
          size={20}
          color={colors.blackSub1}
          style={styles.icon}
        />
      </View>

      {/* 선택된 지역들 */}
      {selected && (
        <View style={styles.selectedWrap}>
          <View style={styles.selectedTag}>
            <Ionicons name="checkmark" size={20} color={colors.mainColor} />
            <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>
              {selected}
            </Text>
            <TouchableOpacity onPress={handleRemove}>
              <Ionicons name="close" size={20} color={colors.blackSub1} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 검색 결과 */}
      {!selected && query.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={[TEXT.body2, { color: colors.blackSub1 }]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* 다음 버튼 */}
      <TouchableOpacity
        disabled={!selected}
        style={[
          styles.nextBtn,
          !selected && { backgroundColor: colors.blackSub4 },
        ]}
        onPress={async () => {
          await fetch("http://13.209.184.54:8080/onboards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers),
          });

          router.replace("/(tabs)/(home)");
        }}
      >
        <Text
          style={[
            TEXT.body22,
            { color: selected ? colors.white : colors.blackSub1 },
          ]}
        >
          다음
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: colors.blackSub3,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: { flex: 1, height: 40 },
  icon: { marginLeft: 8 },
  selectedWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blackSub4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
    gap: 8,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderColor: colors.blackSub5,
    marginHorizontal: 22.5,
  },
  nextBtn: {
    marginTop: "auto",
    marginBottom: 40,
    paddingVertical: 14,
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    alignItems: "center",
  },
});
