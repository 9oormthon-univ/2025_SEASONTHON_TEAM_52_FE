// app/(progress)/[id].tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Checkbox from "expo-checkbox";
import * as Linking from "expo-linking";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import Arrow_Left_5 from "../../assets/svg/Arrow_Left_5";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const openChatLinks: Record<string, string> = {
  "1": "https://open.kakao.com/o/g1234567",
  "2": "https://open.kakao.com/o/g7654321",
  // 필요한 id별 오픈채팅방 링크 등록
};

export default function MatchingProgressDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // 체크박스 3개 상태
  const [checks, setChecks] = useState([false, false, false, false]);

  const toggleCheck = (index: number) => {
    const updated = [...checks];
    updated[index] = !updated[index];
    setChecks(updated);
  };

  const allChecked = checks.every((c) => c);

  const handleChatConnect = () => {
    const link = openChatLinks[id as string];
    if (link) {
      Linking.openURL(link); // 외부 브라우저로 오픈
    } else {
      alert("해당 방의 오픈채팅 링크가 등록되지 않았습니다.");
    }
  };

  return (
    <LinearGradient
      colors={["#FFE9D9", "#FFFDFB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={[TEXT.body22, styles.headerTitle]}>
          룸메이트 안전가이드
        </Text>
        <Pressable style={styles.goBackBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} />
        </Pressable>
      </View>

      {/* 안내 박스 */}
      <View style={styles.guideBox}>
        <Text style={[TEXT.body22, { marginBottom: 24 }]}>
          룸메이트와 연결하기 전{" "}
          <Text style={{ color: colors.mainColor }}>안전가이드 체크</Text>를
          해봐요
        </Text>

        {[
          "이름, 재학/재직 여부 같은 기본 정보를 교환했나요?",
          "앱에 나온 정보만 믿지 말고, 대화를 통해 태도와 성\n향을 더 확인해보세요.",
          "혹시 모를 상황에 대비해 비상 연락망(가족·지인)을\n서로 공유하세요.",
        ].map((label, idx) => (
          <Pressable
            key={idx}
            style={styles.checkRow}
            onPress={() => toggleCheck(idx)}
          >
            <Checkbox
              value={checks[idx]}
              onValueChange={() => toggleCheck(idx)}
              color={checks[idx] ? colors.mainColor : undefined}
            />
            <Text style={TEXT.body4}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 주의 안내 */}
      <View style={styles.noticeBox}>
        <Text style={[TEXT.body3, { marginBottom: 12 }]}>
          이런 경우는 <Text style={{ color: colors.mainColor }}>주의</Text>
          해주세요!
        </Text>
        <Text style={[TEXT.body4, styles.noticeContent]}>
          · 신상 정보를 끝까지 공유하지 않는 경우
        </Text>
        <Text style={[TEXT.body4, styles.noticeContent]}>
          · 대화 중 없이 자꾸 바꾸거나 일관성이 없는 경우
        </Text>
        <Text style={[TEXT.body4, styles.noticeContent]}>
          · "오늘 바로 계약하자"처럼 불필요하게 계약·입주를{"\n"}재촉하는 경우
        </Text>
      </View>

      {/* 버튼 라인 */}
      <View style={styles.lineBtnRow}>
        <TouchableOpacity style={styles.outlineBtn}>
          <Text
            style={[TEXT.body22, { color: colors.mainColor, fontWeight: 700 }]}
          >
            계약 체크리스트 확인하러가기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineBtnRow}>
        <TouchableOpacity style={[styles.outlineBtn]}>
          <Text
            style={[TEXT.body22, { color: colors.mainColor, fontWeight: 700 }]}
          >
            안전계약 신청
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blueOutlineBtn}>
          <Text
            style={[TEXT.body22, { color: colors.subColor, fontWeight: 700 }]}
          >
            보증금 에스크로 신청
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        style={[
          styles.checkRow,
          { alignSelf: "center", width: 180, marginTop: 28 },
        ]}
        onPress={() => toggleCheck(3)}
      >
        <Checkbox
          value={checks[3]}
          onValueChange={() => toggleCheck(3)}
          color={checks[3] ? colors.mainColor : undefined}
        />
        <Text style={[TEXT.body4, { fontWeight: 700 }]}>
          안내 사항을 모두 확인했습니다
        </Text>
      </Pressable>

      {/* 하단 CTA */}
      <View style={styles.footer}>
        <View style={[styles.btnBox, { flex: 1.6 }]}>
          <TouchableOpacity
            style={[
              styles.ctaBtn,
              {
                backgroundColor: allChecked
                  ? colors.mainColor
                  : colors.blackSub3,
              },
            ]}
            disabled={!allChecked}
            onPress={handleChatConnect}
          >
            <Text style={styles.ctaText}>채팅연결</Text>
          </TouchableOpacity>
        </View>
        {checks[3] && ( //나중에 나의 지원인지, 지원자 보기에 따라 달라지는걸로 수정
          <View style={[styles.btnBox, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.ctaBtn, { backgroundColor: colors.blackSub4 }]}
              onPress={() => {
                /**지원 취소 */
              }}
            >
              <Text style={[styles.ctaText, { color: colors.blackSub1 }]}>
                취소
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                TEXT.body4,
                { alignSelf: "center", color: colors.blackSub1, marginTop: 3 },
              ]}
            >
              확정 대기중
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.mainSub1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 10,
  },
  goBackBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { marginLeft: "auto", marginRight: "auto" },
  guideBox: {
    marginTop: 16,
    marginInline: 20,
    marginBottom: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mainSub1,
    padding: 16,
    paddingBlock: 28,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
    width: 280,
    height: 34,
  },
  noticeBox: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mainSub1,
    backgroundColor: "rgba(255,255,255,0.5)", // #FFFFFF 50%
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 14,
  },
  noticeContent: { marginBottom: 10, textAlign: "center" },
  lineBtnRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 16,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.mainColor,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  blueOutlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.subColor,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 90,
  },
  btnBox: {},
  ctaBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaText: { fontSize: 15, fontWeight: "600", color: "#fff" },
});
