import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import PrimaryButton from "../../components/PrimaryButton";
import { TEXT } from "../../constants/TextStyles";

const API_KEY = "AIzaSyBsWJwLO5Z-djxRzMAPwgKNjmgOBOWv_Ig";

type Props = {
  onSelect: (payload: { lat: number; lng: number; address: string }) => void;
  onCancel: () => void;
};

export default function SelectPlace({ onSelect, onCancel }: Props) {
  const mapRef = useRef<MapView>(null);
  const [coord, setCoord] = useState({ lat: 37.5665, lng: 126.978 });
  const [address, setAddress] = useState("서울특별시청 근처");

  const handleRegionChange = async (region: Region) => {
    const lat = Number(region.latitude.toFixed(7));
    const lng = Number(region.longitude.toFixed(7));
    setCoord({ lat, lng });
    console.log(lat, lng);

    const addr = await getDongAddress(lat, lng);
    if (addr) setAddress(addr);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 지도 */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coord.lat,
          longitude: coord.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={handleRegionChange}
      />

      {/* 중앙 고정 핀 */}
      <View style={styles.pinWrapper} pointerEvents="none">
        <View style={styles.circlePin} />
      </View>

      {/* 하단 패널 */}
      <View style={styles.bottomCard}>
        <Text style={[TEXT.title1, { marginBottom: 12, alignSelf: "center" }]}>
          {address || "주소 불러오는 중..."}
        </Text>
        <PrimaryButton
          text="선택 완료"
          onPress={() => onSelect({ ...coord, address })}
        />
        <PrimaryButton text="취소" onPress={onCancel} />
      </View>
    </View>
  );
}

// ✅ Google API: 위도/경도 → "구 + 동"
async function getDongAddress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("API 응답:", JSON.stringify(data, null, 2));

  if (data.status !== "OK") {
    console.error("Google API Error:", data.status);
    return null;
  }

  if (!data.results.length) {
    console.warn("주소 결과 없음:", lat, lng);
    return null;
  }

  // 첫 번째 결과
  const comps = data.results[0].address_components;
  // 동
  const dongComp =
    comps.find((c: any) => c.types.includes("sublocality_level_2")) ||
    comps.find((c: any) => c.types.includes("sublocality_level_1"));

  // 구
  const guComp =
    comps.find((c: any) => c.types.includes("administrative_area_level_2")) ||
    comps.find((c: any) => c.types.includes("sublocality_level_1")); // 📌 fallback 추가

  if (!dongComp || !guComp) {
    console.warn("동/구 정보 없음:", comps);
    return null;
  }

  let dongName = dongComp.long_name.replace(/\d+(?=동$)/, "");
  let guName = guComp.long_name;

  return `${guName === dongName ? "" : `${guName} `}${dongName}`;
}

const styles = StyleSheet.create({
  pinWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 10,
  },
  circlePin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "#fff",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
    gap: 12,
  },
});
