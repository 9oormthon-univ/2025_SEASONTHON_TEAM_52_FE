import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { UserProvider } from "../context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
    Ownglyph: require("../assets/fonts/ownglyph.ttf"),
  });
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Slot />
      </UserProvider>
    </SafeAreaProvider>
  );
}
