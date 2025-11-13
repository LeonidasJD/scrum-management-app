import { ThemeProvider } from "@shared/theme/ThemeContext";
import { FontFamilies } from "@shared/theme/appTheme";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [FontFamilies.regular]: require("@/assets/fonts/Manrope-Regular.ttf"),
    [FontFamilies.medium]: require("@/assets/fonts/Manrope-Medium.ttf"),
    [FontFamilies.semiBold]: require("@/assets/fonts/Manrope-SemiBold.ttf"),
    [FontFamilies.bold]: require("@/assets/fonts/Manrope-Bold.ttf"),
    [FontFamilies.extraBold]: require("@/assets/fonts/Manrope-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
