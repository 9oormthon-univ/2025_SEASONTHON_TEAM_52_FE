import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SeoulMap from "../../components/SeoulMap";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";

const KoreanToCode: Record<string, number> = {
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
const CodeToKorean = {
  11680106: "강남구 대치동",
  11680103: "강남구 개포동",
  11680111: "강남구 세곡동",
  11680107: "강남구 신사동",
  11680110: "강남구 압구정동",
  11680113: "강남구 율현동",
  11680114: "강남구 일원동",
  11680112: "강남구 자곡동",
  11680115: "강남구 수서동",
  11680105: "강남구 삼성동",
  11680108: "강남구 논현동",
  11680101: "강남구 역삼동",
  11680104: "강남구 청담동",
  11680118: "강남구 도곡동",
  11215105: "광진구 자양동",
  11215103: "광진구 구의동",
  11215107: "광진구 화양동",
  11215102: "광진구 능동",
  11215104: "광진구 광장동",
  11215109: "광진구 군자동",
  11215101: "광진구 중곡동",
};
const emptyProfile = {
  userId: 1,
  username: "두둥탁",
  age: 25,
  gender: "MALE",
  introduction: "안녕하세요! 깔끔하고 조용한 룸메이트를 찾고 있습니다.",
  preferredLocationEmdCd: "1168010100",
  hasSpace: false,
  kakaoOpenChatLink: "https://open.kakao.com/...",
  isActive: false,
  lifeCycle: "MORNING",
  tidyLevel: "STRICT",
  smoking: "NON_SMOKER",
  noisePreference: "ALWAYS_QUIET",
  isDesired: true,
};
export default function RegionSelect() {
  const [selectedGu, setSelectedGu] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(emptyProfile);
  const router = useRouter();

  const data = Object.keys(KoreanToCode).filter((item) =>
    item.includes(search)
  );

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://13.209.184.54:8080/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 필요하다면 Authorization 헤더 추가
          },
        });

        if (!res.ok) {
          throw new Error("프로필 불러오기 실패");
        }

        const data = await res.json();
        console.log("서버 응답:", data);

        // 서버 응답이 emptyProfile과 같은 형식이라고 가정
        setProfile(data);
        setSelectedGu(CodeToKorean[data.preferredLocationEmdCd]);
      } catch (err) {
        // fallback
        console.error("프로필 fetch 실패:", err);
        setProfile(emptyProfile);
      }
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[TEXT.body22, styles.headerTitle]}>지역 선택</Text>

      {/* 지도 */}
      <View style={styles.mapWrapperWrapper}>
        <View style={styles.mapWrapper}>
          <SeoulMap selected={selectedGu} onSelect={setSelectedGu} />
        </View>
      </View>

      {/* 지역 선택 결과 */}
      <View style={styles.section}>
        <Text style={TEXT.body4}>원하시는 지역을 한 곳 선택해주세요!</Text>

        {/* 선택 박스 → 클릭하면 모달 열림 */}
        <TouchableOpacity
          style={styles.selectedBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[TEXT.body1, { color: colors.mainColor }]}>
            {selectedGu || "지역을 선택해주세요"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 완료 버튼 */}
      <TouchableOpacity
        style={[
          styles.ctaBtn,
          !selectedGu && { backgroundColor: colors.blackSub2 },
        ]}
        disabled={!selectedGu}
        onPress={async () => {
          await fetch("http://13.209.184.54:8080/auth/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              introduction: profile.introduction,
              preferredLocationEmdCd: KoreanToCode[selectedGu],
              kakaoOpenChatLink: profile.kakaoOpenChatLink,
            }),
          });

          router.push("/(tabs)/(matching)");
        }}
      >
        <Text style={styles.ctaText}>완료</Text>
      </TouchableOpacity>

      {/* 검색 모달 */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
          <TextInput
            style={styles.searchInput}
            placeholder="지역 검색"
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setSelectedGu(item);
                  setModalVisible(false);
                  setSearch("");
                }}
              >
                <Text style={TEXT.body1}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "#fff" }}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  headerTitle: { textAlign: "center", marginBottom: 16 },
  mapWrapperWrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 360,
    height: 320,
    marginBottom: 20,
  },
  mapWrapper: { alignItems: "center", justifyContent: "center", height: 500 },
  section: { marginTop: 12, marginBottom: 20 },
  selectedBox: {
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFF5EC",
  },
  ctaBtn: {
    backgroundColor: colors.mainColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  ctaText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  option: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalClose: {
    marginTop: 12,
    backgroundColor: colors.mainColor,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
