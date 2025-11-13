import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "@/utils/themeStore";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function AppHeader({ showThemeSwitcher = true }) {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeStore();

  return (
    <View
      style={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{
            uri: "https://ucarecdn.com/851c9a95-cf86-442e-8654-9b67b70706d3/-/format/auto/",
          }}
          style={{ width: 60, height: 60, marginRight: 12 }}
          contentFit="contain"
          transition={200}
        />
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 24,
            color: theme.colors.text,
          }}
        >
          MindLink
        </Text>
      </View>
      {showThemeSwitcher && <ThemeSwitcher />}
    </View>
  );
}
