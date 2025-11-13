import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Palette, Check } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useThemeStore, themes } from "@/utils/themeStore";

export default function ThemeSwitcher() {
  const [showModal, setShowModal] = useState(false);
  const { currentTheme, setTheme, theme } = useThemeStore();

  const handleThemeChange = (themeId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTheme(themeId);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Haptics.selectionAsync();
          setShowModal(true);
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.surface,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <Palette size={20} color={theme.colors.primary} />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme.colors.background,
              borderRadius: 24,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Palette
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 12 }}
              />
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 24,
                  color: theme.colors.text,
                  flex: 1,
                }}
              >
                Choose Theme
              </Text>
            </View>

            {Object.values(themes).map((themeOption) => (
              <TouchableOpacity
                key={themeOption.id}
                onPress={() => handleThemeChange(themeOption.id)}
                style={{
                  backgroundColor:
                    currentTheme === themeOption.id
                      ? theme.colors.surface
                      : "transparent",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor:
                    currentTheme === themeOption.id
                      ? theme.colors.primary
                      : theme.colors.border,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: themeOption.colors.primary,
                    marginRight: 16,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    fontFamily: "PTSans_700Bold",
                    fontSize: 18,
                    color: theme.colors.text,
                  }}
                >
                  {themeOption.name}
                </Text>
                {currentTheme === themeOption.id && (
                  <Check size={24} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
