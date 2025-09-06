import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import Arrow_Left_5 from "../../../assets/svg/Arrow_Left_5";
import { TEXT } from "../../../constants/TextStyles";
import Sort_By from "../../../assets/svg/Sort_By";
import Down_Arrow_5 from "../../../assets/svg/Down_Arrow_5";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

const posts = [
  {
    id: "1",
    matchRate: 90,
    title: "운동을 자주해서 활동적인 생활을 합니다!",
    desc: "가끔 같이 운동할 수 있는 룸메이트면 좋겠어요",
    tags: ["비흡연", "청소는 자주"],
    name: "박구름",
    age: 23,
  },
  {
    id: "2",
    matchRate: 85,
    title: "패션에 관심이 많아서 같이 이야기 나누면 좋겠어요",
    desc: "깔끔하고 정리 잘하는 분이면 좋을 것 같아요",
    tags: ["청소는 자주", "22시 취침"],
    name: "한유진",
    age: 25,
  },
  {
    id: "3",
    matchRate: 80,
    title: "조용한 성향을 선호해요!",
    desc: "제가 조용한 편이라 차분한 성격인 분을 찾습니다",
    tags: ["청소는 자주", "22시 취침"],
    name: "김유진",
    age: 22,
  },
  {
    id: "4",
    matchRate: 90,
    title: "운동을 자주해서 활동적인 생활을 합니다!",
    desc: "가끔 같이 운동할 수 있는 룸메이트면 좋겠어요",
    tags: ["비흡연", "청소는 자주"],
    name: "박구름",
    age: 23,
  },
  {
    id: "5",
    matchRate: 85,
    title: "패션에 관심이 많아서 같이 이야기 나누면 좋겠어요",
    desc: "깔끔하고 정리 잘하는 분이면 좋을 것 같아요",
    tags: ["청소는 자주", "22시 취침"],
    name: "한유진",
    age: 25,
  },
  {
    id: "6",
    matchRate: 80,
    title: "조용한 성향을 선호해요!",
    desc: "제가 조용한 편이라 차분한 성격인 분을 찾습니다",
    tags: ["청소는 자주", "22시 취침"],
    name: "김유진",
    age: 22,
  },
  {
    id: "7",
    matchRate: 90,
    title: "운동을 자주해서 활동적인 생활을 합니다!",
    desc: "가끔 같이 운동할 수 있는 룸메이트면 좋겠어요",
    tags: ["비흡연", "청소는 자주"],
    name: "박구름",
    age: 23,
  },
  {
    id: "8",
    matchRate: 85,
    title: "패션에 관심이 많아서 같이 이야기 나누면 좋겠어요",
    desc: "깔끔하고 정리 잘하는 분이면 좋을 것 같아요",
    tags: ["청소는 자주", "22시 취침"],
    name: "한유진",
    age: 25,
  },
  {
    id: "9",
    matchRate: 80,
    title: "조용한 성향을 선호해요!",
    desc: "제가 조용한 편이라 차분한 성격인 분을 찾습니다",
    tags: ["청소는 자주", "22시 취침"],
    name: "김유진",
    age: 22,
  },
  {
    id: "10",
    matchRate: 90,
    title: "운동을 자주해서 활동적인 생활을 합니다!",
    desc: "가끔 같이 운동할 수 있는 룸메이트면 좋겠어요",
    tags: ["비흡연", "청소는 자주"],
    name: "박구름",
    age: 23,
  },
  {
    id: "11",
    matchRate: 85,
    title: "패션에 관심이 많아서 같이 이야기 나누면 좋겠어요",
    desc: "깔끔하고 정리 잘하는 분이면 좋을 것 같아요",
    tags: ["청소는 자주", "22시 취침"],
    name: "한유진",
    age: 25,
  },
  {
    id: "12",
    matchRate: 80,
    title: "조용한 성향을 선호해요!",
    desc: "제가 조용한 편이라 차분한 성격인 분을 찾습니다",
    tags: ["청소는 자주", "22시 취침"],
    name: "김유진",
    age: 22,
  },
];

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

const KoreanToCode = {
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

export default function RoomPosts() {
  const router = useRouter();
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const [isChecked, setChecked] = useState<boolean>(false);
  const [isChecked2, setChecked2] = useState<boolean>(false);

  const [deposit, setDeposit] = useState<number | string | null>(null);
  const [depositNegotiable, setDepositNegotiable] = useState(false);

  const [rent, setRent] = useState<number | string | null>(null);
  const [rentNegotiable, setRentNegotiable] = useState(false);

  const [buildingType, setBuildingType] = useState<string | null>(null);
  const [moveIn, setMoveIn] = useState<string | null>(null);
  const [minPeriod, setMinPeriod] = useState<string | null>(null);
  const [profile, setProfile] = useState({ preferredLocationEmdCd: "" });

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
      } catch (err) {
        // fallback
        console.error("프로필 fetch 실패:", err);
        setProfile({ preferredLocationEmdCd: "" });
      }
    };

    getProfile();
  }, []);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      console.log(CodeToKorean[profile.preferredLocationEmdCd]);
      const res = await fetch(
        `http://13.209.184.54:8080/api/room-posts/matching?area=${
          CodeToKorean[profile.preferredLocationEmdCd]
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 필요하다면 Authorization 헤더 추가
          },
        }
      );

      if (!res.ok) {
        throw new Error("프로필 불러오기 실패");
      }

      const data = await res.json();
      console.log("서버 응답:", data.data.posts);

      // 서버 응답이 emptyProfile과 같은 형식이라고 가정
      setPosts(data.data.posts);
    } catch (err) {
      // fallback
      console.error("포스트 fetch 실패:", err);
    }
  };
  useEffect(() => {
    if (profile.preferredLocationEmdCd !== "") getPosts();
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.goBackBtn}
          onPress={() => router.push("(tabs)/(matching)")}
        >
          <Arrow_Left_5 stroke={colors.black} />
        </Pressable>
        <Text style={[TEXT.body22, styles.headerTitle]}>
          방이 있는 룸메이트 매칭
        </Text>
      </View>
      <View style={styles.filterLine}>
        <Pressable
          style={styles.filterBtn}
          onPress={() => setFilterVisible(true)}
        >
          <Sort_By stroke={colors.black} />
        </Pressable>
        <Pressable style={styles.sortBtn}>
          <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>최신순</Text>
          <Down_Arrow_5 stroke={colors.blackSub1} />
        </Pressable>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.matchRate}>
                <Text style={[TEXT.body4, styles.matchRateText]}>
                  매칭률 {item.matchRate}%
                </Text>
              </View>
              <Ionicons name="heart" size={20} color={colors.blackSub1} />
            </View>
            <Text
              style={[TEXT.body22, styles.title]}
              onPress={() => router.push(`/(tabs)/(matching)/${item.id}`)}
            >
              {item.title}
            </Text>
            <Text style={[TEXT.body4, styles.desc]}>{item.desc}</Text>

            <View style={styles.tagsRow}>
              {/* {item.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))} */}
              <View style={styles.profile}>
                <View style={styles.userImg} />
                <Text style={styles.user}>
                  {item.name} {item.age}세
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      {/* 필터 모달 */}
      <Modal visible={filterVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {/* 보증금 */}
              <Text style={styles.sectionTitle}>보증금</Text>
              <View style={styles.squareOptionRow}>
                {[100, 200, 400, 600, 800, "~1000"].map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.squareOptionBtn,
                      deposit === val && { borderColor: colors.mainColor },
                    ]}
                    onPress={() => setDeposit(val)}
                  >
                    <Text
                      style={[
                        TEXT.body3,
                        {
                          color:
                            deposit === val ? colors.mainColor : colors.black,
                        },
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Pressable
                onPress={() => setDepositNegotiable(!depositNegotiable)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 12,
                  paddingBottom: 4,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={depositNegotiable}
                  onValueChange={setDepositNegotiable}
                  color={depositNegotiable ? colors.mainColor : undefined}
                />
                <Text style={TEXT.body3}>협의 가능</Text>
              </Pressable>

              {/* 월세 */}
              <Text style={styles.sectionTitle}>월세</Text>
              <View style={styles.squareOptionRow}>
                {[20, 40, 60, 80, "100이상"].map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.squareOptionBtn,
                      rent === val && { borderColor: colors.mainColor },
                    ]}
                    onPress={() => setRent(val)}
                  >
                    <Text
                      style={[
                        TEXT.body3,
                        {
                          color: rent === val ? colors.mainColor : colors.black,
                        },
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Pressable
                onPress={() => setRentNegotiable(!rentNegotiable)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 12,
                  paddingBottom: 4,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={rentNegotiable}
                  onValueChange={setRentNegotiable}
                  color={rentNegotiable ? colors.mainColor : undefined}
                />
                <Text style={TEXT.body3}>협의 가능</Text>
              </Pressable>

              {/* 집형태 */}
              <Text style={styles.sectionTitle}>집형태</Text>
              <View style={styles.optionRow}>
                {[
                  "아파트",
                  "오피스텔",
                  "빌라/주택",
                  "쉐어하우스",
                  "기타",
                  "상관없음",
                ].map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.optionBtn,
                      buildingType === val && { borderColor: colors.mainColor },
                    ]}
                    onPress={() => setBuildingType(val)}
                  >
                    <Text
                      style={[
                        {
                          color:
                            buildingType === val
                              ? colors.mainColor
                              : colors.black,
                        },
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 입주 희망 시기 */}
              <Text style={styles.sectionTitle}>입주 희망 시기</Text>
              <View style={styles.optionRow}>
                {["1분기", "2분기", "3분기", "4분기", "상관없음"].map((val) => (
                  <TouchableOpacity
                    key={val}
                    style={[
                      styles.optionBtn,
                      moveIn === val && { borderColor: colors.mainColor },
                    ]}
                    onPress={() => setMoveIn(val)}
                  >
                    <Text
                      style={[
                        {
                          color:
                            moveIn === val ? colors.mainColor : colors.black,
                        },
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 최소 거주 기간 */}
              <Text style={styles.sectionTitle}>최소 거주 기간</Text>
              <View style={styles.optionRow}>
                {["1개월 이내", "3개월", "6개월", "12개월", "상관없음"].map(
                  (val) => (
                    <TouchableOpacity
                      key={val}
                      style={[
                        styles.optionBtn,
                        minPeriod === val && { borderColor: colors.mainColor },
                      ]}
                      onPress={() => setMinPeriod(val)}
                    >
                      <Text
                        style={[
                          {
                            color:
                              minPeriod === val
                                ? colors.mainColor
                                : colors.black,
                          },
                        ]}
                      >
                        {val}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>

            {/* 하단 버튼 */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.footerBtn,
                  { backgroundColor: colors.blackSub2 },
                ]}
                onPress={() => setFilterVisible(false)}
              >
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.footerBtn,
                  { backgroundColor: colors.mainColor },
                ]}
                onPress={() => setFilterVisible(false)}
              >
                <Text style={{ color: colors.white }}>선택완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    paddingRight: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  goBackBtn: {
    width: 50,
    height: 40,
    justifyContent: "center",
    marginRight: "auto",
  },
  headerTitle: {
    marginRight: "auto",
  },
  filterLine: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  filterBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  sortBtn: {
    height: 40,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 16,
  },
  cardHeader: { flexDirection: "row", paddingRight: 10 },
  matchRate: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF1E6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 6,
    marginRight: "auto",
  },
  matchRateText: { color: colors.mainColor },
  title: { marginBottom: 4 },
  desc: { marginBottom: 16, color: colors.blackSub1 },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tag: {
    backgroundColor: colors.white,
    borderColor: colors.mainColor,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  tagText: { color: colors.mainColor, fontSize: 12 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: 12,
  },
  userImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mainSub1,
    marginRight: 8,
  },
  user: { fontSize: 13, color: "#444" },

  // 모달 스타일
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "100%",
    paddingInline: 30,
  },
  topLine: {
    backgroundColor: colors.blackSub2,
    height: 4,
    borderRadius: 2,
    width: 68,
    alignSelf: "center",
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  squareOptionRow: { flexDirection: "row", flexWrap: "wrap" },
  squareOptionBtn: {
    borderWidth: 1,
    borderColor: colors.blackSub3,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: "#d8d8d8",
  },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionBtn: {
    borderWidth: 1,
    borderColor: colors.blackSub3,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalFooter: {
    flexDirection: "row",
    borderColor: "#eee",
    marginTop: 48,
    marginBottom: 20,
    marginInline: -10,
    gap: 10,
  },
  footerBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
});
