import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../../styles/colors";
import { TEXT } from "../../../constants/TextStyles";
import Notification_12 from "../../../assets/svg/Notification_12"; // 알림 아이콘 예시
import Comments_Alt_Lines from "../../../assets/svg/Comments_Alt_Lines";

const appliedPosts = [
  { id: "1", name: "박구름", age: 23, mbti: "ENFJ", status: "수락됨" },
  { id: "2", name: "한유진", age: 25, mbti: "ESFJ", status: "대기중" },
];

const incomingRequests = [
  { id: "3", name: "김유라", age: 22, mbti: "ENTP", status: "대기중" },
  { id: "4", name: "최서연", age: 24, mbti: "ISTJ", status: "수락됨" },
];

export default function ProgressScreen() {
  const [tab, setTab] = useState<"applied" | "incoming">("applied");
  const router = useRouter();

  const data = tab === "applied" ? appliedPosts : incomingRequests;

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={[TEXT.body22, styles.headerTitle]}>매칭 현황</Text>
        <Notification_12 stroke={colors.black} style={{ marginLeft: "auto" }} />
      </View>

      {/* 탭 메뉴 */}
      <View style={styles.tabHeader}>
        <Pressable
          onPress={() => setTab("applied")}
          style={[styles.tabBtn, tab === "applied" && styles.tabActive]}
        >
          <Text
            style={{
              color: tab === "applied" ? colors.mainColor : colors.blackSub1,
            }}
          >
            나의 신청 목록
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab("incoming")}
          style={[styles.tabBtn, tab === "incoming" && styles.tabActive]}
        >
          <Text
            style={{
              color: tab === "incoming" ? colors.mainColor : colors.blackSub1,
            }}
          >
            지원자 목록
          </Text>
        </Pressable>
      </View>

      {/* 목록 */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: "https://via.placeholder.com/48" }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={TEXT.body22}>{item.name}</Text>
              <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                {item.age}세 · {item.mbti}
              </Text>
            </View>

            {/* 상태/버튼 */}
            {tab === "applied" &&
              (item.status === "수락됨" ? (
                <TouchableOpacity
                  style={styles.chatBtn}
                  onPress={() =>
                    router.push(`/(tabs)/(progress)/(temp)/${item.id}`)
                  }
                >
                  <Comments_Alt_Lines stroke={colors.blackSub1} />
                  <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                    대화하기
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
              ))}

            {tab === "incoming" &&
              (item.status === "대기중" ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={styles.acceptBtn}>
                    <Text style={styles.acceptText}>수락</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectBtn}>
                    <Text style={styles.rejectText}>거절</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.chatBtn}
                  onPress={() =>
                    router.push(`/(tabs)/(progress)/(temp)/${item.id}`)
                  }
                >
                  <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                    대화하기
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: { fontWeight: "600" },
  tabHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabBtn: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabActive: { borderBottomColor: colors.mainColor, borderBottomWidth: 2 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 12 },

  cancelBtn: { padding: 8 },
  cancelText: { color: colors.mainColor },

  acceptBtn: { padding: 8 },
  acceptText: { color: colors.mainColor },

  rejectBtn: { padding: 8 },
  rejectText: { color: "red" },

  chatBtn: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.mainColor,
    borderRadius: 8,
  },
  chatText: { color: "#fff" },
});
