// app/(tabs)/(matching)/[id].tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Arrow_Left_5 from "../../../assets/svg/Arrow_Left_5";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Right_Arrow from "../../../assets/svg/Right_Arrow";

const reviews = [
  {
    id: 111,
    name: "박**",
    rating: 5,
    livedMonth: 3,
    script:
      "수도권으로 이주하면서 단기로 같이 지냈는데 서로 맞춰갈 수 있어서 좋았어요!",
    date: "2025.06.02",
  },
  {
    id: 211,
    name: "김**",
    rating: 4,
    livedMonth: 12,
    script: "깨끗하고 괜찮은데 집안에서의 전화가 좀 잦은 친구입니다.",
    date: "2024.12.27",
  },
];

const postData = [
  {
    id: 1,
    profile: {
      name: "박구름",
      age: 23,
      mbti: "ENFJ",
      tags: ["비흡연", "대부분외출", "청소 자주"],
    },
    room: {
      alreadyOwn: false,
      deposit: 1000,
      rent: 70,
      managementFee: 0,
      building: "오피스텔",
      numberOfRooms: "투룸",
      area: 25,
      longtitude: 10.1,
      lattitude: 20.2,
    },
  },
  {
    id: 2,
    profile: {
      name: "한유진",
      age: 25,
      mbti: "INTJ",
      tags: ["청소 자주", "22시 취침", "흡연"],
    },
    room: {
      alreadyOwn: true,
      deposit: 2000,
      rent: 50,
      managementFee: 5,
      building: "아파트",
      numberOfRooms: "투룸",
      area: 25,
      longtitude: 10.1,
      lattitude: 20.2,
    },
  },
];
export default function MatchingDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [tab, setTab] = useState<
    "룸메이트 정보" | "방정보" | "집위치" | "후기"
  >("룸메이트 정보");

  const data = postData.some((p) => p.id === Number(id))
    ? postData.find((p) => p.id === Number(id))
    : postData[0];

  function getObjectParticle(word: string): string {
    const lastChar = word.charCodeAt(word.length - 1);

    // 한글 유니코드 범위 안에 있는 경우만
    if (lastChar >= 0xac00 && lastChar <= 0xd7a3) {
      const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
      return hasBatchim ? "을" : "를";
    }
    // 한글이 아닐 경우 기본값
    return "를";
  }

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Pressable style={styles.goBackBtn} onPress={() => router.back()}>
          <Arrow_Left_5 stroke={colors.black} />
        </Pressable>
        <Ionicons
          name="heart"
          size={20}
          color={colors.blackSub1}
          style={{ marginLeft: "auto" }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {data.room.alreadyOwn ? (
          <View
            style={{
              backgroundColor: colors.mainSub1,
              height: 240,
              marginTop: 0,
            }}
          >
            <Text
              style={[TEXT.title1, { alignSelf: "center", marginTop: 110 }]}
            >
              예시 이미지
            </Text>
          </View>
        ) : (
          <View style={{ height: 80 }} />
        )}
        {/* 모집글 제목 & 내용 */}
        <View style={styles.post}>
          <Text style={[TEXT.body1, styles.title]}>
            당산역 근처에 같이 살 룸메이트 구해요.
          </Text>
          <Text style={[TEXT.body4, styles.date]}>
            1일 전 [테스트용 id:{id}]
          </Text>
          <Text style={[TEXT.body3, styles.desc]}>
            저는 조용히 지내는 걸 좋아해서 집에서는 거의 쉬거나 간단히 요리하는
            정도예요.{"\n\n"}흡연은 안 하고 음주도 가끔만 하는 편이에요! 주사는
            없어요! 청소는 돌아가면서 같이 하면 좋을 것 같고, 기본적인 생활
            매너만 지켜주시면 괜찮아요.{"\n\n"}가능하면 저처럼 직장인 여성분이면
            더 잘 맞을 것 같아요.
          </Text>
        </View>

        {/* 탭 메뉴 */}
        <View style={styles.tabHeader}>
          {["룸메이트 정보", "방정보", "집위치", "후기"].map((label) => (
            <Pressable
              key={label}
              onPress={() => setTab(label as any)}
              style={[styles.tabBtn, tab === label && styles.tabActive]}
            >
              <Text
                style={{
                  color: tab === label ? colors.mainColor : colors.blackSub1,
                }}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 탭 내용 */}
        {tab === "룸메이트 정보" && (
          <View style={styles.section}>
            <View style={styles.profileRow}>
              <View style={styles.avatar} />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 10,
                  }}
                >
                  <Text style={TEXT.body22}>{data.profile.name}</Text>
                  <Text
                    style={[
                      TEXT.body4,
                      { color: colors.blackSub1, marginBottom: 1 },
                    ]}
                  >
                    {data.profile.age}세 · {data.profile.mbti}
                  </Text>
                </View>
                <View style={styles.tagsRow}>
                  {data.profile.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={[styles.tagText, TEXT.body4]}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  * 프로필을 누르면 자세한 성향을 알 수 있어요
                </Text>
              </View>
              <Right_Arrow
                stroke={colors.black}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>
        )}

        {tab === "방정보" && (
          <View style={styles.section}>
            <Text style={TEXT.body1}>방 정보</Text>
            <Text style={[TEXT.body4, { color: colors.blackSub2 }]}>
              룸메이트가 찾는 방의 조건과 시세예요.
            </Text>
            <View style={styles.depositAndRent}>
              <View style={styles.labelAndPrice}>
                <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>
                  {data.room.alreadyOwn || "희망 "}보증금
                </Text>
                <Text style={TEXT.body22}>{data.room.deposit}만원</Text>
              </View>
              <View style={styles.labelAndPrice}>
                <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>
                  {data.room.alreadyOwn || "희망 "}월세
                </Text>
                <Text style={TEXT.body22}>{data.room.rent}만원</Text>
              </View>
              {data.room.alreadyOwn && (
                <View style={styles.labelAndPrice}>
                  <Text style={[TEXT.body3, { color: colors.blackSub1 }]}>
                    관리비
                  </Text>
                  <Text style={TEXT.body22}>{data.room.managementFee}만원</Text>
                </View>
              )}
            </View>
            <Text style={[TEXT.body3, styles.notice]}>
              <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                이 룸메이트와 함께라면{"\n"}
              </Text>
              매달 {35}만원, 1년에 {35 * 12}만원
              <Text style={{ color: colors.blackSub1 }}>
                을 아낄 수 있어요!
              </Text>
            </Text>
            <Text style={[TEXT.body22, { marginTop: 24 }]}>
              '{data.room.building}'{getObjectParticle(data.room.building)}{" "}
              원해요
            </Text>
            <Text style={[TEXT.body3, styles.notice]}>
              <Text style={{ color: colors.blackSub1 }}>
                이 지역 {data.room.building}{" "}
              </Text>
              평균 월세는 {70}만원
              <Text style={{ color: colors.blackSub1 }}>이에요</Text>
            </Text>
          </View>
        )}

        {tab === "집위치" && (
          <View style={styles.section}>
            <Text style={TEXT.body1}>원하는 집 위치</Text>
            <Text
              style={[
                TEXT.body4,
                { color: colors.blackSub2, marginTop: 4, marginBottom: 6 },
              ]}
            >
              안전을 위해 오차가 있어요
            </Text>
            <View style={styles.mapPlaceholder}>
              <Text>지도 들어갈 자리</Text>
            </View>
          </View>
        )}

        {tab === "후기" && (
          <View style={styles.section}>
            <View style={styles.subTitleLine}>
              <Text style={TEXT.body1}>후기</Text>
              <Pressable
                style={{
                  marginLeft: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {}}
              >
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  더보기
                </Text>
                <Right_Arrow stroke={colors.blackSub1} />
              </Pressable>
            </View>
            <Text
              style={[
                TEXT.body4,
                { color: colors.blackSub2, marginTop: 4, marginBottom: 6 },
              ]}
            >
              최근 룸메이트 후기를 볼 수 있어요
            </Text>
            {reviews.map((review) => (
              <View style={styles.reviewCard}>
                <Text style={TEXT.body3}>{review.name}</Text>
                <Text style={{ color: colors.mainColor }}>
                  {Array(Math.round(review.rating)).fill("⭐").join("")}{" "}
                  {review.rating}
                </Text>
                <Text style={TEXT.body4}>{review.script}</Text>
                <Text
                  style={[
                    TEXT.body4,
                    { color: colors.blackSub2, marginTop: 8, marginBottom: 6 },
                  ]}
                >
                  {review.date}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 매칭 신청 버튼 */}
      <TouchableOpacity style={styles.ctaBtn}>
        <Text style={styles.ctaText}>매칭 신청하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    position: "absolute", // 고정
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // 항상 투명
    zIndex: 10,
  },
  goBackBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { marginLeft: 10 },
  post: { paddingHorizontal: 20, marginBottom: 20, marginTop: 20 },
  title: { marginBottom: 6 },
  date: { color: colors.blackSub1, marginBottom: 18 },
  desc: { lineHeight: 20 },
  tabHeader: {
    marginTop: 20,
    marginInline: -20,
    paddingInline: 40,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginHorizontal: 20,
    borderTopColor: colors.blackSub4,
    borderTopWidth: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomColor: colors.mainColor,
    borderBottomWidth: 2,
  },
  section: { padding: 20 },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.mainSub1,
    marginRight: 12,
    marginBlock: 24,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.mainSub1,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginRight: 6,
  },
  tagText: { color: colors.mainColor, fontSize: 12 },
  depositAndRent: { flexDirection: "row", gap: 32, marginTop: 12 },
  labelAndPrice: { flexDirection: "row", gap: 12, alignItems: "center" },
  notice: {
    backgroundColor: "#FFF5EC",
    color: colors.mainColor,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: "#eee",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  subTitleLine: {
    flexDirection: "row",
  },
  reviewCard: {
    marginTop: 4,
    paddingBlock: 16,
    borderRadius: 12,
  },
  ctaBtn: {
    position: "absolute",
    bottom: 75,
    left: 20,
    right: 20,
    backgroundColor: colors.mainColor,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
