// index.js
import "react-native-gesture-handler"; // (권장) 제스처 네이티브 준비
import { enableScreens } from "react-native-screens";

// 네이티브 스크린 활성화 (필수)
enableScreens(true);

import { registerRootComponent } from "expo";
import App from "./App";

// Expo/네이티브 모두에서 엔트리 등록
registerRootComponent(App);
