import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Headphones, X } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { musicGenres } from "../constants";

export function MusicSelectionModal({
  visible,
  onClose,
  selectedMusic,
  onSelectMusic,
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
            <Headphones
              size={24}
              color={theme.colors.secondary}
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
              Music Recommendations
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 300 }}
          >
            {musicGenres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onSelectMusic(genre);
                  Haptics.selectionAsync();
                }}
                style={{
                  backgroundColor:
                    selectedMusic?.name === genre.name
                      ? `${theme.colors.secondary}20`
                      : theme.colors.surface,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor:
                    selectedMusic?.name === genre.name
                      ? theme.colors.secondary
                      : theme.colors.border,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24, marginRight: 16 }}>
                  {genre.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PTSans_700Bold",
                      fontSize: 16,
                      color: theme.colors.text,
                      marginBottom: 2,
                    }}
                  >
                    {genre.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PTSans_400Regular",
                      fontSize: 12,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    Perfect for {genre.mood} moods
                  </Text>
                </View>
                {selectedMusic?.name === genre.name && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: theme.colors.secondary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 12 }}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: theme.colors.secondary,
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
