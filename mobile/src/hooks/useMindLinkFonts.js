import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
} from "@expo-google-fonts/pt-sans";

export default function useMindLinkFonts() {
  const [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
  });

  return fontsLoaded;
}
