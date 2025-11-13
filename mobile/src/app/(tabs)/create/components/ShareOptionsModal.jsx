import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Globe, Heart, Users, BookOpen, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { shareOptions } from "../constants";

const iconMap = {
  "Public Feed": Globe,
  "Close Friends": Heart,
  Anonymous: Users,
  "Journal Only": BookOpen,
};

export function ShareOptionsModal({
  visible,
  onClose,
  selectedShareOption,
  onSelectShareOption,
  onShare,
  insets,
  theme,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: insets.bottom + 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                flex: 1,
              }}
            >
              Share Your Mood Orb
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: theme.colors.surface,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <X size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          {shareOptions.map((option, index) => {
            const IconComponent = iconMap[option.name];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onSelectShareOption(option);
                  Haptics.selectionAsync();
                }}
                style={{
                  backgroundColor:
                    selectedShareOption.name === option.name
                      ? `${theme.colors.primary}20`
                      : theme.colors.surface,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor:
                    selectedShareOption.name === option.name
                      ? theme.colors.primary
                      : theme.colors.border,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: `${theme.colors.primary}20`,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <IconComponent size={22} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PTSans_700Bold",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 2,
                    }}
                  >
                    {option.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PTSans_400Regular",
                      fontSize: 12,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {option.desc}
                  </Text>
                </View>
                {selectedShareOption.name === option.name && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: theme.colors.primary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 12 }}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={onShare}
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 16,
              padding: 18,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Create & Share Now
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
