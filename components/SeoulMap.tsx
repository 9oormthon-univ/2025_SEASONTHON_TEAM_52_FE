// SeoulMap.tsx
import React from "react";
import MapView, { Polygon } from "react-native-maps";
import seoul from "../assets/seoul.json";

type SeoulMapProps = {
  selected: string | null;
  onSelect: (name: string) => void;
};

const blankMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }], // 배경을 흰색으로
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }], // 모든 라벨 제거
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }], // 도로, 경계선 제거
  },
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }], // 건물/지형 채움 제거
  },
];

export default function SeoulMap({ selected, onSelect }: SeoulMapProps) {
  const region = {
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

  return (
    <MapView
      style={{ flex: 1, width: 360, height: 360, alignSelf: "center" }}
      initialRegion={region}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      customMapStyle={blankMapStyle}
    >
      {seoul.features.map((feature: any, idx: number) => {
        const name = feature.properties.SIG_KOR_NM;

        // GeoJSON → 좌표 변환
        const coords = feature.geometry.coordinates[0].map(
          (coord: number[]) => ({
            latitude: coord[1],
            longitude: coord[0],
          })
        );

        return (
          <Polygon
            key={idx}
            coordinates={coords}
            strokeColor="#fff"
            strokeWidth={1}
            tappable
            fillColor={
              selected === name
                ? "rgba(255,107,0,0.7)" // 선택된 구
                : "rgba(224,224,224,0.9)" // 기본
            }
            onPress={() => onSelect(name)}
          />
        );
      })}
    </MapView>
  );
}
