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

const RcWrite = () => {
  const [title, setTitle] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const [houseType, setHouseType] = useState<string>();
  const [moveIn, setMoveIn] = useState<string>();
  const [minStay, setMinStay] = useState<string>();

  const [desc, setDesc] = useState("");
  const DESC_MAX = 500;
  const [deposit, setDeposit] = useState("");
  const [rent, setRent] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const MAX_PHOTOS = 10;
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const [place, setPlace] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isFormValid =
    title.trim().length > 0 &&
    deposit.trim().length > 0 &&
    rent.trim().length > 0 &&
    !!houseType &&
    !!moveIn &&
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

  const houseTypeOptions = [
    "아파트",
    "오피스텔",
    "빌라 / 주택",
    "셰어하우스",
    "기타",
    "상관없음",
  ];
  const moveInOptions = [
    "1개월 이내",
    "3개월",
    "6개월",
    "12개월 이상",
    "상관없음",
  ];
  const minStayOptions = ["1개월", "3개월", "6개월", "12개월 이상", "상관없음"];

  const insets = useSafeAreaInsets();
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
                  placeholder="희망 보증금을 작성해주세요"
                  keyboardType="number-pad"
                  value={deposit ? `${deposit}만원` : ""}
                  onChangeText={(text) => {
                    // 숫자만 추출
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    setDeposit(onlyNums);
                  }}
                />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? colors.mainColor : undefined}
                />
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  협의가능
                </Text>
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
                  placeholder="희망 월세를 작성해주세요"
                  keyboardType="number-pad"
                  value={rent ? `${rent}만원` : ""}
                  onChangeText={(text) => {
                    const onlyNums = text.replace(/[^0-9]/g, "");
                    setRent(onlyNums);
                  }}
                />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked2}
                  onValueChange={setChecked2}
                  color={isChecked2 ? colors.mainColor : undefined}
                />
                <Text style={[TEXT.body4, { color: colors.blackSub1 }]}>
                  협의가능
                </Text>
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
              placeholder="희망하는 집의 형태를 선택해주세요"
              value={houseType}
              onChange={setHouseType}
              options={houseTypeOptions}
            />

            <DropdownField
              fieldKey="moveIn"
              openKey={openKey}
              setOpenKey={setOpenKey}
              icon={<Calendar stroke={colors.blackSub1} />}
              placeholder="입주 희망 시기를 선택해주세요"
              value={moveIn}
              onChange={setMoveIn}
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
          onPress={() => {
            if (isFormValid) {
              router.replace("(tabs)/(matching)");
            }
          }}
        />
      </View>
    </>
  );
};

export default RcWrite;

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
