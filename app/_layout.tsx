import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
    Ownglyph: require("../assets/fonts/ownglyph.ttf"),
  });
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}
