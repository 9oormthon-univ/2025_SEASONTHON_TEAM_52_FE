import { Slot } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
    Ownglyph: require("../assets/fonts/ownglyph.ttf"),
  });
  return <Slot />;
}
