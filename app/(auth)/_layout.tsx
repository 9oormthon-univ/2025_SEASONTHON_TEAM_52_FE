import { Stack } from "expo-router";
import { View } from "react-native";
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: 20,
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
