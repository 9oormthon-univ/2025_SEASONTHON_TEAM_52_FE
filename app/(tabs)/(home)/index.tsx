import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TEXT } from "../../../constants/TextStyles";
import colors from "../../styles/colors";
import ProfileFeatureGrid from "../../../components/ProfileFeatureGrid";
import ShieldCheck from "../../../assets/svg/ShieldCheck";
import MapPin from "../../../assets/svg/MainPin";
import ChevronRight from "../../../assets/svg/ChevronRight";
import * as Progress from "react-native-progress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
//shadow 수정 필요

const Home = () => {
  const [isRoommate, setIsRoommate] = useState(false);

  const insets = useSafeAreaInsets();
  const TAB_HEIGHT = 20;
  return (
    <>
      <LinearGradient
        colors={["#FFE9D9", "#FFFDFB"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.background}
      />
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Text style={[TEXT.logo, { fontSize: 32, paddingLeft: 10 }]}>
          오손도손
        </Text>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: TAB_HEIGHT + insets.bottom + 16 }, // 탭바 여유
          ]}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        >
          {/* 룸메이트 성향 입력 */}
          {isRoommate === false && (
            <Pressable
              style={styles.roommateBox}
              onPress={() => {
                router.push("/preferences/1");
                setIsRoommate(true);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 33.94,
                }}
              >
                <Image
                  source={require("../../../assets/icon/Write.png")}
                  style={{ width: 75.82, height: 63.18 }}
                />
                <View>
                  <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                    성향 매칭을 위해서는 필수예요
                  </Text>
                  <Text
                    style={[TEXT.body22]}
                  >{`내가 원하는\n룸메이트 성향 입력하기`}</Text>
                </View>
                <ChevronRight style={{ marginLeft: 8 }} />
              </View>
            </Pressable>
          )}

          {/* 룸메이트 찾기 */}
          <View style={styles.contentBox}>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              onPress={() => router.push("(tabs)/(matching)")}
            >
              <Image
                source={require("../../../assets/icon/Puzzle.png")}
                style={{ width: 91.3, height: 57.79, marginTop: 4 }}
              />
              <View>
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  프로필을 토대로 매칭을 시작해요
                </Text>
                <Text
                  style={[TEXT.body22]}
                >{`나의 성향과\n맞는 룸메이트 찾기!`}</Text>
              </View>
              <ChevronRight style={{ marginLeft: 8 }} />
            </Pressable>
          </View>

          {/* 프로필 카드 */}
          <View style={styles.profileBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 8,
                marginBottom: 28,
              }}
            >
              <Text style={TEXT.title1}>프로필</Text>
              <View style={styles.statusButton}>
                <Text style={[TEXT.body4, { color: colors.mainColor }]}>
                  매칭중
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 27.5,
                }}
              >
                <Image
                  source={require("../../../assets/icon/BasicProfile.png")}
                  style={{
                    width: 86,
                    height: 86,
                  }}
                />

                <View style={{ gap: 7, flex: 1, paddingRight: 13 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 13,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Pretendard",
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: 24,
                        }}
                      >
                        박구름
                      </Text>
                      <ShieldCheck />
                    </View>
                    <ChevronRight />
                  </View>
                  <View style={{ flexDirection: "row", gap: 13 }}>
                    <Text style={TEXT.body3}>28세</Text>
                    <Text style={TEXT.body3}>여</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <MapPin />
                    <Text style={TEXT.body3}>서울시 영등포구 당산동</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 8, gap: 10, marginBottom: 15 }}>
              <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                프로필 작성 진행률
              </Text>
              <Progress.Bar
                progress={0.9}
                color={colors.mainColor}
                borderWidth={0}
                animated={false}
                unfilledColor="#e6e6e6"
                width={width - 100}
                borderRadius={15}
              />
            </View>
            <ProfileFeatureGrid
              lifeCycle="MORNING"
              smoking="NON_SMOKER"
              cleanFreq="OFTEN"
              tidyLevel="STRICT"
            />
          </View>

          {/* 커뮤니티 */}
          <View style={styles.communityBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 8,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={TEXT.title1}>커뮤니티</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  더보기
                </Text>
                <ChevronRight
                  width={11}
                  height={14}
                  stroke={colors.blackSub1}
                />
              </View>
            </View>
            <View style={{ gap: 10, paddingLeft: 10 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 23 }}
              >
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#d9d9d9",
                    width: 48,
                    height: 48,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Text style={TEXT.body3}>청소 분담 어떻게 하세요?</Text>
                  <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                    주 1회 같이 하자고 했는데 자꾸...
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 23 }}
              >
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#d9d9d9",
                    width: 48,
                    height: 48,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <Text style={TEXT.body3}>
                    집 계약할 때 어떤 부분을 중요하게 확인해야...
                  </Text>
                  <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                    요즘 전세사기 많이 들어서 걱정...
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    top: height * 0.88,
    left: 0,
    right: 0,
    position: "absolute",
  },
  featureGrid: {
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  roommateBox: {
    height: 100,
    borderWidth: 1.5,
    borderColor: colors.mainColor,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginBottom: 14,
    paddingVertical: 16,
    paddingHorizontal: 17,
  },
  contentBox: {
    height: 100,
    borderWidth: 1,
    borderColor: "#FFD4B6",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginBottom: 14,
    paddingVertical: 16,
    paddingHorizontal: 17,
  },
  profileBox: {
    height: 435,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    marginBottom: 14,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  communityBox: {
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    paddingVertical: 15,
  },
  featureBox: {
    flex: 1,
    backgroundColor: colors.mainSub2,
    borderRadius: 8,
    height: 72,
    alignItems: "center",
    paddingVertical: 12.5,
  },
  statusButton: {
    backgroundColor: "#FFEFE2",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15.5,
  },
});
