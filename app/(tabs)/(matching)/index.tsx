import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Pencil_Edit from "../../../assets/svg/Pencil_Edit";
import colors from "../../styles/colors";
import Heart from "../../../assets/svg/Heart";
import Down_Arrow_5 from "../../../assets/svg/Down_Arrow_5";
import { TEXT } from "../../../constants/TextStyles";
import { useState, useEffect } from "react";
import Right_Arrow from "../../../assets/svg/Right_Arrow";
import GoPreference from "../../../components/GoPreference";

const { width } = Dimensions.get("window");

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

const UserData = {
  gu: "영등포구",
  dong: "당산동",
  아파트: 82,
  오피스텔: 68,
  빌라: 61,
};
const cards = [
  {
    id: 1,
    name: "구르미",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
  },
  {
    id: 2,
    name: "구르미",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
  },
  {
    id: 3,
    name: "구르미",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
  },
];
const cardsWithRoom = [
  {
    roommatePostId: 11121,
    userId: 641,
    username: "김고양",
    userProfile: "string",
    age: 24,
    mbti: "ENTJ",
    score: 85,
    matchedOptions: {
      a: "청소 자주",
      b: "야행성",
    },
    title: "절대 방해하지 않습니다",
    deposit: 800,
    monthlyRent: 40,
  },
  {
    roommatePostId: 11122,
    userId: 642,
    username: "김왈왈",
    userProfile: "string",
    age: 22,
    mbti: "ENTJ",
    score: 80,
    matchedOptions: {
      a: "잠귀 둔감",
      b: "흡연",
    },
    title: "재밌게 지내봐요!",
    deposit: 500,
    monthlyRent: 60,
  },
  {
    roommatePostId: 11123,
    userId: 643,
    username: "김하악",
    userProfile: "string",
    age: 24,
    mbti: "INTJ",
    score: 90,
    matchedOptions: {
      a: "청결 예민",
      b: "야행성",
    },
    title: "나 혼자 냅둬요",
    deposit: 1000,
    monthlyRent: 70,
  },
];
const CARD_WIDTH = 260;
const CARD_SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

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

export default function MatchingScreen() {
  const router = useRouter();
  const [haveRoom, setHaveRoom] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const [profile, setProfile] = useState(emptyProfile);
  const [roommatePosts, setRoomatePosts] = useState(cardsWithRoom);
  const [roomPosts, setRoomPosts] = useState(cardsWithRoom);
  const [houseType, setHouseType] = useState<
    "apartment" | "officetel" | "rowhouse"
  >("officetel");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const houseTypeLabels = {
    apartment: "아파트",
    officetel: "오피스텔",
    rowhouse: "빌라",
  };

  const [avgRent, setAvgRent] = useState<number | null>(null);
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
        setProfile(emptyProfile);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(
          `http://13.209.184.54:8080/recommendations/room-posts?area=${
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
        console.log("서버 응답:", data.data);

        // 서버 응답이 emptyProfile과 같은 형식이라고 가정
        setRoomPosts(data.data.length > 0 ? data.data : cardsWithRoom);
      } catch (err) {
        // fallback
        console.error("포스트 fetch 실패:", err);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const res = await fetch(
          `http://13.209.184.54:8080/api/monthly-stats/${profile.preferredLocationEmdCd.slice(
            0,
            5
          )}/type/${houseType}/latest`
        );
        if (!res.ok) throw new Error("월세 불러오기 실패");
        const data = await res.json();
        setAvgRent(data.avgMonthlyRent); // 서버 응답에 맞춰 필드명 확인
      } catch (err) {
        console.error("월세 fetch 실패:", err);
        setAvgRent(null);
      }
    };
    if (profile?.preferredLocationEmdCd) fetchRent();
  }, [houseType, profile.preferredLocationEmdCd]);

  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    setPage(index);
  };
  return (
    <LinearGradient
      colors={["#FFE9D9", "#FFFDFB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* 상단 헤더 */}
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/(map)")}>
            <Text style={styles.location}>
              {CodeToKorean[profile.preferredLocationEmdCd]}
            </Text>
          </Pressable>
          <Down_Arrow_5 stroke={colors.black} style={{ marginRight: "auto" }} />
          <View style={styles.headerIcons}>
            <Heart stroke={colors.black} />
            <Pressable onPress={() => router.push("recruit/SelectType")}>
              <Pencil_Edit stroke={colors.black} />
            </Pressable>
          </View>
        </View>

        {/* 뉴디자인 */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 55,
            justifyContent: "center",
            marginTop: 26,
            marginBottom: 30,
          }}
        >
          <View>
            <View style={{ position: "relative" }}>
              {/* 드롭다운 버튼 */}
              <Pressable
                onPress={() => setDropdownOpen((prev) => !prev)}
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={TEXT.body22}>{houseTypeLabels[houseType]}</Text>
                <Down_Arrow_5 stroke={colors.black} />
              </Pressable>

              {/* 드롭다운 메뉴 */}
              {dropdownOpen && (
                <View
                  style={{
                    position: "absolute",
                    top: 30,
                    left: 0,
                    backgroundColor: colors.white,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: colors.blackSub3,
                    zIndex: 100,
                  }}
                >
                  {Object.entries(houseTypeLabels).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setHouseType(
                          key as "apartment" | "officetel" | "rowhouse"
                        );
                        setDropdownOpen(false);
                      }}
                      style={{ padding: 12 }}
                    >
                      <Text
                        style={[
                          TEXT.body22,
                          {
                            color:
                              houseType === key
                                ? colors.mainColor
                                : colors.black,
                          },
                        ]}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View>
              <Text style={[TEXT.body2, { color: colors.black, marginTop: 4 }]}>
                평균 월세는{" "}
                <Text style={[TEXT.title1, { color: colors.mainColor }]}>
                  {avgRent !== null ? `약 ${avgRent}만원` : "불러오는 중..."}
                </Text>{" "}
                이에요.
              </Text>
            </View>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
              onPress={() => router.push("/statistics")}
            >
              <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                자세히보기
              </Text>
              <Right_Arrow
                stroke={colors.blackSub1}
                style={{
                  marginRight: "auto",
                  width: 10,
                  height: 10,
                  marginTop: 2,
                }}
              />
            </Pressable>
          </View>
          <Image source={require("../../../assets/icon/building.png")} />
        </View>

        <View style={styles.tabHeader}>
          <Pressable
            onPress={() => setHaveRoom(false)}
            style={[
              styles.tabButton,
              !haveRoom ? styles.tabButtonActivated : undefined,
            ]}
          >
            <Text
              style={
                (TEXT.body22,
                { color: haveRoom ? colors.blackSub1 : colors.mainColor })
              }
            >
              같이 구해요
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setHaveRoom(true)}
            style={[styles.tabButton, haveRoom && styles.tabButtonActivated]}
          >
            <Text
              style={
                (TEXT.body22,
                { color: !haveRoom ? colors.blackSub1 : colors.mainColor })
              }
            >
              방 있어요
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        nestedScrollEnabled={true}
      >
        {/* 매칭 섹션 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>구름님과 매칭률이 높아요</Text>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() =>
              router.push(
                haveRoom
                  ? "/(tabs)/(matching)/roomPostList"
                  : "/(tabs)/(matching)/roomatePostList"
              )
            }
          >
            <Text style={styles.more}>더보기 </Text>
            <Right_Arrow stroke={colors.blackSub1} />
          </Pressable>
        </View>

        {/**지우면 됨 */}
        {/*      <GoPreference />*/}

        <FlatList
          data={haveRoom ? roomPosts : roommatePosts}
          style={{ marginInline: -20 }}
          keyExtractor={(item) => item.roommatePostId.toString()}
          horizontal
          decelerationRate="fast"
          snapToInterval={295} // 카드 너비(260) + margin(20) + 뭔지 모를 수치 15
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          contentContainerStyle={{
            paddingRight: 30,
            paddingLeft: 20, // ← 왼쪽도 맞춰줌
          }}
          renderItem={({ item }) => (
            <View style={[styles.card]}>
              <View style={styles.onMatching}>
                <Text style={(TEXT.body4, { color: colors.mainColor })}>
                  매칭중
                </Text>
              </View>
              <View style={styles.profile}>
                <View style={styles.avatar} />
                <View style={styles.nameAndDetail}>
                  <Text style={[TEXT.body22, styles.name]}>
                    {item.username}
                  </Text>
                  <Text style={[TEXT.body3, styles.sub]}>
                    {item.age}세 · {item.mbti}
                  </Text>
                </View>
                <Pressable style={styles.arrowBtn}>
                  <Right_Arrow width={28} height={28} stroke={colors.black} />
                </Pressable>
              </View>
              <Text style={[TEXT.body4, styles.tagLabel]}>비슷한 성향</Text>
              <View style={styles.tagsRow}>
                {Object.entries(item.matchedOptions).map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={[TEXT.body4, styles.tagText]}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={[TEXT.body4, styles.desc]}>
                {haveRoom && "area" in item && "building" in item
                  ? `${CodeToKorean[profile.preferredLocationEmdCd]} ${
                      item.area
                    }평 ${item.building}에서 같이 살 룸메 찾아요!`
                  : `${
                      CodeToKorean[profile.preferredLocationEmdCd]
                    } 근처에서 같이 살 룸메 찾아요!`}
              </Text>
              {haveRoom && (
                <Text style={[TEXT.body4, styles.desc2]}>
                  보증금{" "}
                  {"deposit" in item && item.deposit !== undefined
                    ? String(item.deposit)
                    : ""}{" "}
                  / 월세{" "}
                  {"monthlyRent" in item && item.monthlyRent !== undefined
                    ? String(item.monthlyRent)
                    : ""}
                </Text>
              )}
            </View>
          )}
        />

        <View style={styles.indicatorRow}>
          {cards.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: page === i ? "#FF6B00" : "#FFD9B3" },
              ]}
            />
          ))}
        </View>

        {/* CTA 버튼 */}
        {haveRoom || (
          <View>
            <View style={styles.bottomBtnLine}>
              <Text style={(TEXT.body4, { color: colors.blackSub1 })}>
                룸메이트랑 살 집도 알아보고 있나요?
              </Text>
            </View>
            <TouchableOpacity style={styles.ctaBtn}>
              <Text style={styles.ctaText}>쉐어하우스 찾아보기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingInline: 20,
    paddingTop: 50,
  },
  scroll: {
    paddingTop: 0,
    paddingInline: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 4,
  },
  houseFilter: {
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.5)", // #FFFFFF 50%
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    shadowColor: colors.mainSub1,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4, // 안드로이드 그림자
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 12,
    paddingInline: 20,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  filterBtn: {
    width: 90,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.blackSub4,
    alignItems: "center",
  },
  filterActive: {
    backgroundColor: "#FFEDE2",
  },
  notice: {
    marginTop: 16,
    color: colors.black,
  },
  lookMore: {
    marginTop: 12,
    marginLeft: "auto",
    color: colors.blackSub1,
  },
  tabHeader: {
    borderBlockColor: colors.mainColor,
    borderBottomWidth: 0.5,
    marginLeft: -20,
    marginRight: -20,
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 30,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tabButtonActivated: {
    borderBottomColor: colors.mainColor,
    borderBottomWidth: 1,
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  more: {
    marginLeft: "auto",
    color: colors.blackSub1,
  },
  card: {
    width: 260,
    flexDirection: "column",
    padding: 16,
    paddingInline: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginTop: 16,
    elevation: 2, // 안드로이드 shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignItems: "flex-start",
    marginHorizontal: 10, // 좌우 여백
    marginBlock: 10,
  },
  onMatching: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.mainSub2,
    marginLeft: "auto",
  },
  indicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    width: 220,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.mainSub1,
    marginRight: 20,
  },
  nameAndDetail: { flexDirection: "column" },
  name: {
    fontWeight: "700",
  },
  sub: {
    color: colors.black,
    marginBottom: 4,
  },
  arrowBtn: {
    marginLeft: "auto",
    width: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  tagLabel: {
    color: colors.blackSub1,
    marginTop: 16,
    marginBottom: 4,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mainSub1,
    marginRight: 6,
    marginBottom: 8,
  },
  tagText: {
    color: colors.mainColor,
  },
  desc: { marginTop: 4, marginBottom: 10 },
  desc2: { marginTop: -8, marginBottom: 8, color: colors.blackSub1 },
  bottomBtnLine: {
    marginTop: 20,
    alignItems: "center",
  },
  ctaBtn: {
    marginTop: 8,
    marginBottom: 125,
    marginHorizontal: 10,
    borderColor: colors.mainColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
  ctaText: {
    color: colors.mainColor,
    fontSize: 15,
    fontWeight: "600",
  },
});
