import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import MoodOrb from "@/components/MoodOrb";

export function OrbPreview({
  backgroundImage,
  selectedColors,
  selectedAnimation,
  moodIntensity,
  theme,
}) {
  return (
    <View style={{ alignItems: "center", marginBottom: 32 }}>
      <View style={{ position: "relative" }}>
        {backgroundImage && (
          <Image
            source={{ uri: backgroundImage }}
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              position: "absolute",
            }}
            contentFit="cover"
          />
        )}
        <MoodOrb
          colors={selectedColors}
          size={200}
          animation={selectedAnimation}
          glowIntensity={moodIntensity / 10}
        />
      </View>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 14,
            color: theme.colors.textSecondary,
            marginBottom: 8,
          }}
        >
          Intensity: {moodIntensity}/10
        </Text>
        <View
          style={{
            width: 200,
            height: 6,
            backgroundColor: theme.colors.border,
            borderRadius: 3,
          }}
        >
          <View
            style={{
              width: `${(moodIntensity / 10) * 100}%`,
              height: "100%",
              backgroundColor: theme.colors.primary,
              borderRadius: 3,
            }}
          />
        </View>
      </View>
    </View>
  );
}
