import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import colors from "../styles/colors";
import { TEXT } from "../../constants/TextStyles";
import MapPin from "../../assets/svg/MainPin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import Down_Arrow_5 from "../../assets/svg/Down_Arrow_5";
import Home_10 from "../../assets/svg/Home_10";
import Calendar from "../../assets/svg/Calendar";
import Coin from "../../assets/svg/Coin";
import Stopwatch from "../../assets/svg/Stopwatch";
import Money_Bag from "../../assets/svg/Money_Bag";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import SelectPlace from "./SelectPlace";

function DropdownField({
  icon,
  placeholder,
  value,
  onChange,
  options,
  fieldKey,
  openKey,
  setOpenKey,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value?: string;
  onChange: (v: string) => void;
  options: string[];
  fieldKey: string;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
}) {
  const open = openKey === fieldKey;

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <Pressable
        onPress={() => setOpenKey(open ? null : fieldKey)}
        style={styles.field}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon}
          <Text
            style={[
              TEXT.body4,
              { color: value ? colors.black : colors.blackSub1 },
            ]}
          >
            {value || placeholder}
          </Text>
        </View>
        <Down_Arrow_5 stroke={colors.blackSub1} />
      </Pressable>

      {open && (
        <View style={styles.dropdownPanel}>
          {options.map((opt, idx) => (
            <Pressable
              key={opt}
              onPress={() => {
                onChange(opt);
                setOpenKey(null);
              }}
              style={[
                styles.dropdownItem,
                idx !== options.length - 1 && styles.dropdownDivider,
              ]}
            >
              <Text
                style={[
                  TEXT.body2,
                  { color: opt === value ? colors.mainColor : colors.black },
                ]}
              >
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const MateWrite = () => {
  const [title, setTitle] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const [houseType, setHouseType] = useState<string>();
  const [moveInDate, setMoveInDate] = useState<string>();
  const [minStay, setMinStay] = useState<string>();
  const [managementFee, setManagementFee] = useState<string>();
  const [roomNum, setRoomNum] = useState<string>();
  const [size, setSize] = useState<string>();

  const [desc, setDesc] = useState("");
  const DESC_MAX = 500;
  const [deposit, setDeposit] = useState("");
  const [rent, setRent] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const MAX_PHOTOS = 10;
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const hasDeposit = deposit.trim().length > 0 || isChecked; // 보증금 협의가능
  const hasRent = rent.trim().length > 0 || isChecked2;

  const [place, setPlace] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isFormValid =
    title.trim().length > 0 &&
    hasDeposit &&
    hasRent &&
    !!houseType &&
    !!moveInDate &&
    !!minStay;

  const pickImages = async () => {
    // 권한
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      // 권한 거부 시 무시
      return;
    }

    // 갤러리 오픈 (남은 슬롯만큼 선택 허용)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Android에서도 지원됨(최신 SDK)
      selectionLimit: Math.max(1, MAX_PHOTOS - photos.length),
      quality: 0.8,
    });

    if (!result.canceled) {
      const remain = MAX_PHOTOS - photos.length;
      const add = result.assets.slice(0, remain);
      setPhotos((prev) => [...prev, ...add]);
    }
  };

  const removePhotoAt = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const mapHouseType: Record<
    string,
    "APARTMENT" | "OFFICETEL" | "VILLA" | "SHARE_HOUSE" | "OTHER"
  > = {
    아파트: "APARTMENT",
    오피스텔: "OFFICETEL",
    "빌라 / 주택": "VILLA",
    셰어하우스: "SHARE_HOUSE",
    기타: "OTHER",
  };

  const roomNumType: Record<string, "ONE_ROOM" | "TWO_ROOMS" | "OTHER"> = {
    원룸: "ONE_ROOM",
    투룸: "TWO_ROOMS",
    "쓰리룸 이상": "OTHER",
  };

  function toMoveInQuarter(v?: string): "Q1" | "Q2" | "Q3" | "Q4" | null {
    switch (v) {
      case "1개월 이내":
        return "Q1";
      case "3개월":
        return "Q1";
      case "6개월":
        return "Q2";
      case "12개월 이상":
        return "Q4";
      default:
        return null;
    }
  }

  function toMinStayMonths(v?: string): number | null {
    if (!v || v === "상관없음") return null;
    if (v === "12개월 이상") return 12;
    const m = v.match(/\d+/);
    return m ? Number(m[0]) : null;
  }
  const houseTypeOptions = [
    "아파트",
    "오피스텔",
    "빌라 / 주택",
    "셰어하우스",
    "기타",
  ];
  const moveInOptions = [
    "1개월 이내",
    "3개월",
    "6개월",
    "12개월 이상",
    "상관없음",
  ];
  const minStayOptions = ["1개월", "3개월", "6개월", "12개월 이상", "상관없음"];
  const roomNumOptions = ["원룸", "투룸", "쓰리룸 이상"];

  const insets = useSafeAreaInsets();

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const maybe = <T extends Record<string, any>>(obj: T) =>
      Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
      );
    const toInt = (s?: string) => {
      if (!s) return null;
      const n = Number(String(s).replace(/[^0-9]/g, ""));
      return Number.isFinite(n) ? Math.trunc(n) : null;
    };
    const toFloat = (s?: string) => {
      if (!s) return null;
      const n = Number(String(s).replace(/[^0-9.]/g, ""));
      return Number.isFinite(n) ? n : null;
    };

    const depositInt = toInt(deposit);
    const rentInt = toInt(rent);
    const mgmtInt = toInt(managementFee);
    const sizeInt = toFloat(size);
    const roomNumEnum =
      roomNum === "원룸"
        ? "ONE_ROOM"
        : roomNum === "투룸"
        ? "TWO_ROOMS"
        : "OTHER";

    const depositVal = deposit.trim() ? Number(deposit) : null;
    const rentVal = rent.trim() ? Number(rent) : null;
    const stayVal =
      minStay && minStay !== "상관없음" ? toMinStayMonths(minStay) : null;
    const toNumberOrNull = (s?: string) => {
      if (!s) return null;
      const cleaned = s.replace(/[^0-9.]/g, "");
      if (!cleaned) return null;
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : null;
    };

    const payload = maybe({
      userId: 119,
      title,
      latitude: place.lat,
      longitude: place.lng,
      area: place.address,
      content: desc || "",
      deposit: depositInt,
      monthlyRent: rentInt,
      size: sizeInt,
      managementFee: mgmtInt,
      minStayPeriod: stayVal,
      roomNum: roomNumEnum,
      houseType:
        houseType && houseType !== "상관없음" ? mapHouseType[houseType] : null,
      moveInDate:
        moveInDate && moveInDate !== "상관없음"
          ? toMoveInQuarter(moveInDate)
          : null,
    });

    // ---- 2) FormData + Blob 이미지 첨부 ----
    const fd = new FormData();
    fd.append("meta", JSON.stringify(payload));

    // 각 사진을 Blob으로 변환해서 append
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i];
      try {
        // expo-image-picker가 준 로컬 URI -> Blob
        const resp = await fetch(p.uri);
        const blob = await resp.blob(); // <- 바이너리

        fd.append(
          "images",
          blob as any, // RN 타입 회피
          p.fileName ?? `photo_${i}.${p.mimeType?.split("/")[1] || "jpg"}`
        );
      } catch (e) {
        console.warn("이미지 Blob 변환 실패, 건너뜀:", p.uri, e);
      }
    }

    // ---- 3) 전송 ----
    try {
      const res = await fetch("http://13.209.184.54:8080/api/room-posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Cookie: "JESSION=41e124da-d217-4742-8714-cf8366ecda0e",
        },
        body: fd,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`POST ${res.status} ${errText}`);
      }

      router.replace("(tabs)/(matching)");
      console.log(fd);
    } catch (e) {
      console.log("게시글 등록 실패:", e);
      console.log(fd);
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom - 20 },
        ]}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={{ marginTop: 36, gap: 15 }}>
            <TextInput
              style={[
                TEXT.body4,
                {
                  height: 60,
                  borderRadius: 12,
                  width: "100%",
                  borderWidth: 1,
                  borderColor: colors.blackSub3,
                  color: colors.black,
                  paddingHorizontal: 16,
                },
              ]}
              placeholderTextColor={colors.blackSub1}
              placeholder="게시물 제목을 작성해주세요"
              value={title}
              onChangeText={setTitle}
            />
            <Pressable
              style={[styles.field]}
              onPress={() => setModalVisible(true)}
            >
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <MapPin stroke="#8c8c8c" />
                <Text style={[TEXT.body4, { color: colors.black }]}>
                  {place?.address || "지역을 선택해주세요"}
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.divider} />
          <View style={{ gap: 15 }}>
            <View style={styles.field}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  flex: 1,
                }}
              >
                <Money_Bag stroke={colors.blackSub1} />

                <TextInput
                  style={[TEXT.body4, { flex: 1 }]}
                  placeholder="보증금을 작성해주세요"
                  keyboardType="number-pad"
                  value={deposit ? `${deposit}만원` : ""}
                  onChangeText={(text) => {
                    // 숫자만 추출
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    setDeposit(onlyNums);
                  }}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  flex: 1,
                }}
              >
                <Coin stroke={colors.blackSub1} />
                <TextInput
                  style={[TEXT.body4, { flex: 1 }]}
                  placeholder="월세를 작성해주세요"
                  keyboardType="number-pad"
                  value={rent ? `${rent}만원` : ""}
                  onChangeText={(text) => {
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    setRent(onlyNums);
                  }}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  flex: 1,
                }}
              >
                <Coin stroke={colors.blackSub1} />
                <TextInput
                  style={[TEXT.body4, { flex: 1 }]}
                  placeholder="관리비를 작성해주세요"
                  keyboardType="number-pad"
                  value={managementFee ? `${managementFee}만원` : ""}
                  onChangeText={(text) => {
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    setManagementFee(onlyNums);
                  }}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  flex: 1,
                }}
              >
                <Coin stroke={colors.blackSub1} />
                <TextInput
                  style={[TEXT.body4, { flex: 1 }]}
                  placeholder="집의 면적을 작성해주세요 예) 25.5㎡"
                  keyboardType="decimal-pad"
                  value={size ? `${size}㎡` : ""}
                  onChangeText={(text) => {
                    const onlyNums = text.replace(/[^0-9.]/g, "");
                    setSize(onlyNums);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={{ gap: 15 }}>
            <DropdownField
              fieldKey="houseType"
              openKey={openKey}
              setOpenKey={setOpenKey}
              icon={<Home_10 stroke={colors.blackSub1} />}
              placeholder="집의 형태를 선택해주세요"
              value={houseType}
              onChange={setHouseType}
              options={houseTypeOptions}
            />

            <DropdownField
              fieldKey="roomNum"
              openKey={openKey}
              setOpenKey={setOpenKey}
              icon={<Stopwatch stroke={colors.blackSub1} />}
              placeholder="방의 개수를 선택해주세요"
              value={roomNum}
              onChange={setRoomNum}
              options={roomNumOptions}
            />

            <DropdownField
              fieldKey="moveInDate"
              openKey={openKey}
              setOpenKey={setOpenKey}
              icon={<Calendar stroke={colors.blackSub1} />}
              placeholder="입주 희망 시기를 선택해주세요"
              value={moveInDate}
              onChange={setMoveInDate}
              options={moveInOptions}
            />

            <DropdownField
              fieldKey="minStay"
              openKey={openKey}
              setOpenKey={setOpenKey}
              icon={<Stopwatch stroke={colors.blackSub1} />}
              placeholder="최소 거주기간을 선택해주세요"
              value={minStay}
              onChange={setMinStay}
              options={minStayOptions}
            />
          </View>

          <View style={styles.divider} />
          <View style={{ gap: 15 }}>
            <View style={styles.textareaWrap}>
              <TextInput
                style={styles.textarea}
                placeholder="추가 조건을 작성해주세요"
                multiline
                value={desc}
                onChangeText={setDesc}
                maxLength={DESC_MAX}
                textAlignVertical="top"
                placeholderTextColor={colors.blackSub1}
              />
              <Text
                style={[
                  TEXT.body4,
                  styles.counter,
                  {
                    color:
                      desc.length >= DESC_MAX
                        ? colors.mainColor
                        : colors.blackSub1,
                  },
                ]}
              >
                {desc.length}/{DESC_MAX}
              </Text>
            </View>

            <View style={{ gap: 8 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.photoRow}
              >
                {photos.length < MAX_PHOTOS && (
                  <Pressable style={styles.addTile} onPress={pickImages}>
                    <Image
                      source={require("../../assets/icon/Gallery2.png")}
                      style={{ width: 33, height: 33, marginBottom: 2 }}
                    />
                    <Text
                      style={[
                        TEXT.body4,
                        { color: colors.blackSub1, alignSelf: "center" },
                      ]}
                    >
                      사진 {photos.length}/{MAX_PHOTOS}
                    </Text>
                  </Pressable>
                )}
                {photos.map((p, i) => (
                  <View key={p.assetId ?? p.uri + i} style={styles.thumbWrap}>
                    <Image source={{ uri: p.uri }} style={styles.thumb} />
                    <Pressable
                      style={styles.removeBtn}
                      onPress={() => removePhotoAt(i)}
                    >
                      <Text style={styles.removeX}>×</Text>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <SelectPlace
          onSelect={(payload) => {
            setPlace(payload); // 주소 + 좌표 저장
            setModalVisible(false); // 모달 닫기
          }}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
      <View style={{ paddingHorizontal: 20 }}>
        <PrimaryButton
          text="완료"
          active={isFormValid}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};

export default MateWrite;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  divider: {
    height: 4,
    backgroundColor: colors.blackSub5,
    marginVertical: 17,
    alignSelf: "stretch",
    marginHorizontal: -20,
  },
  checkbox: {
    borderRadius: 4,
    borderColor: "#d8d8d8",
    width: 16,
    height: 16,
  },
  dropdownPanel: {
    width: "50%",
    marginTop: 59,
    marginLeft: "49%",
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
    boxShadow: "2px 2px 4px 0 rgba(0, 0, 0, 0.25)",
    zIndex: 1,
  },
  dropdownItem: {
    height: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  dropdownDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.blackSub4,
  },
  field: {
    height: 60,
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.blackSub3,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  textareaWrap: {
    position: "relative",
  },
  textarea: {
    height: 248,
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.blackSub3,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  counter: {
    position: "absolute",
    right: 16,
    bottom: 12,
  },
  photoBox: {
    height: 70,
    width: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.blackSub3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  photoRow: {
    gap: 12,
  },
  thumbWrap: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.blackSub3,
    position: "relative",
    backgroundColor: "#fff",
  },
  thumb: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeBtn: {
    position: "absolute",
    top: 5,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 11,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  removeX: {
    color: colors.blackSub1,
    fontSize: 16,
    lineHeight: 16,
  },
  addTile: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.blackSub3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
