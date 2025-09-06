// SeoulMap.tsx
import React, { useEffect, useState, useRef } from "react";
import MapView, { Polygon } from "react-native-maps";
import { View } from "react-native";

const blankMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }],
  },
];

export default function SeoulMap({ code }) {
  const mapRef = useRef<MapView>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch(
          `http://13.209.184.54:8080/api/location/dong/emd/${code}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (!res.ok) throw new Error("지역 데이터 불러오기 실패");

        const data = await res.json();
        setGeoData(data);

        // 폴리곤 좌표 변환
        const coords = data.features[0].geometry.coordinates[0][0].map(
          (coord: number[]) => ({
            latitude: coord[1],
            longitude: coord[0],
          })
        );

        // 중심 좌표 계산 (bounding box 중심)
        const lats = coords.map((c) => c.latitude);
        const lngs = coords.map((c) => c.longitude);
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

        setInitialRegion({
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        // 화면 꽉 차게 fit
        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
          animated: true,
        });
      } catch (err) {
        console.error("지역 fetch 실패:", err);
        setGeoData(null);
      }
    };

    if (code > 1000) getProfile();
  }, [code]);

  return (
    <View style={{ width: 360, height: 360, alignSelf: "center" }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        {geoData && (
          <Polygon
            coordinates={geoData.features[0].geometry.coordinates[0][0].map(
              (coord: number[]) => ({
                latitude: coord[1],
                longitude: coord[0],
              })
            )}
            strokeColor="#fff"
            strokeWidth={1}
            tappable
            fillColor={"rgba(255,107,0,0.7)"}
          />
        )}
      </MapView>
    </View>
  );
}
