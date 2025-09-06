import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
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
import { useState } from "react";
import Right_Arrow from "../../../assets/svg/Right_Arrow";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

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
    id: 4,
    name: "건물주",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
    area: 25,
    building: "아파트",
    deposit: 1000,
    rent: 70,
  },
  {
    id: 5,
    name: "건물주",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
    area: 21,
    building: "빌라",
    deposit: 800,
    rent: 60,
  },
  {
    id: 6,
    name: "건물주",
    age: 26,
    mbti: "ESFJ",
    tags: ["비흡연", "22시 이전", "청소 자주", "둔함", "대부분 외출"],
    region: "영등포구",
    area: 29,
    building: "오피스텔",
    deposit: 1300,
    rent: 70,
  },
];
const CARD_WIDTH = 260;
const CARD_SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;
export default function MatchingScreen() {
  const router = useRouter();
  const [selectedBuilding, setSelectedBuilding] = useState<string>("아파트");
  const [haveRoom, setHaveRoom] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

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
          <Text style={styles.location}>
            {UserData.gu} {UserData.dong}
          </Text>
          <Down_Arrow_5 stroke={colors.black} style={{ marginRight: "auto" }} />
          <View style={styles.headerIcons}>
            <Heart stroke={colors.black} />
            <Pressable onPress={() => router.push("recruit/SelectType")}>
              <Pencil_Edit stroke={colors.black} />
            </Pressable>
          </View>
        </View>

        <View style={styles.houseFilter}>
          <View style={styles.filterRow}>
            {["아파트", "오피스텔", "빌라"].map((label, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedBuilding(label)}
                style={[
                  styles.filterBtn,
                  label == selectedBuilding && styles.filterActive,
                ]}
              >
                <Text
                  style={{
                    ...TEXT.body4,
                    color:
                      label === selectedBuilding
                        ? colors.mainColor
                        : colors.blackSub1,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[TEXT.body3, styles.notice]}>
            {UserData.gu}에서 집을 구한다면, 평균 월세는 약{" "}
            {UserData[selectedBuilding]}만원이에요.
          </Text>
          <Text style={[TEXT.body4, styles.lookMore]}>자세히 보기</Text>
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
            onPress={() => router.push("/(tabs)/(matching)/list")}
          >
            <Text style={styles.more}>더보기 </Text>
            <Right_Arrow stroke={colors.blackSub1} />
          </Pressable>
        </View>
        <FlatList
          data={haveRoom ? cardsWithRoom : cards}
          style={{ marginInline: -20 }}
          keyExtractor={(item) => item.id.toString()}
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
                  <Text style={[TEXT.body22, styles.name]}>{item.name}</Text>
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
                {item.tags.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={[TEXT.body4, styles.tagText]}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={[TEXT.body4, styles.desc]}>
                {haveRoom && "area" in item && "building" in item
                  ? `${item.region} ${item.area}평 ${item.building}에서 같이 살 룸메 찾아요!`
                  : `${item.region} 근처에서 같이 살 룸메 찾아요!`}
              </Text>
              {haveRoom && (
                <Text style={[TEXT.body4, styles.desc2]}>
                  보증금{" "}
                  {"deposit" in item && item.deposit !== undefined
                    ? String(item.deposit)
                    : ""}{" "}
                  / 월세{" "}
                  {"rent" in item && item.rent !== undefined
                    ? String(item.rent)
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
    backgroundColor: colors.mainColor,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
