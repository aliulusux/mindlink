import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Sparkles,
  Calendar,
  Activity,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import useMindLinkFonts from "../../../hooks/useMindLinkFonts";
import MoodOrb from "../../../components/MoodOrb";

const mockOrbDetails = {
  1: {
    id: "1",
    colors: ["#FF6B9D", "#C06595", "#845EC2"],
    animation: "pulse",
    mood: "Hopeful & Excited",
    description:
      "Feeling like something amazing is about to happen. New beginnings energy.",
    wavelength: 94,
    timestamp: "2 hours ago",
    emotionalState: "Joy",
    intensity: "High",
    tags: ["hopeful", "excited", "anticipation"],
  },
  2: {
    id: "2",
    colors: ["#1E90FF", "#4169E1", "#00CED1"],
    animation: "drift",
    mood: "Calm Reflection",
    description:
      "Taking time to process everything. Peaceful but contemplative.",
    wavelength: 87,
    timestamp: "5 hours ago",
    emotionalState: "Serenity",
    intensity: "Medium",
    tags: ["calm", "reflection", "peace"],
  },
  3: {
    id: "3",
    colors: ["#FFD700", "#FFA500", "#FF8C00"],
    animation: "spiral",
    mood: "Creative Flow",
    description: "Ideas flowing freely. Feeling inspired and energized.",
    wavelength: 92,
    timestamp: "1 day ago",
    emotionalState: "Inspiration",
    intensity: "High",
    tags: ["creative", "inspired", "flow"],
  },
};

export default function OrbDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { orbId } = useLocalSearchParams();
  const fontsLoaded = useMindLinkFonts();
  const [liked, setLiked] = useState(false);

  const orb = mockOrbDetails[orbId] || mockOrbDetails["1"];

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLiked(!liked);
  };

  const handleConnect = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Future: Navigate to chat
    alert("Connection request sent! 🌟");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      {/* Ambient background matching orb colors */}
      <LinearGradient
        colors={[`${orb.colors[0]}20`, `${orb.colors[1]}15`, "transparent"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60%",
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 32,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "PTSans_700Bold",
              fontSize: 18,
              color: "#FFFFFF",
              marginRight: 40,
            }}
          >
            Mood Orb
          </Text>
        </View>

        {/* Large Orb Display */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <MoodOrb
            colors={orb.colors}
            size={220}
            animation={orb.animation}
            glowIntensity={1}
          />
        </View>

        {/* Wavelength Match */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: "rgba(138, 43, 226, 0.2)",
              borderRadius: 20,
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: "#8A2BE2",
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: "#8A2BE2",
              }}
            >
              {orb.wavelength}% Match
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.5)",
              marginTop: 8,
            }}
          >
            Emotional Wavelength
          </Text>
        </View>

        {/* Mood Info */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 28,
              color: "#FFFFFF",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {orb.mood}
          </Text>
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            {orb.description}
          </Text>
        </View>

        {/* Emotional Details */}
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 24,
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Activity size={24} color="#8A2BE2" style={{ marginBottom: 8 }} />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              {orb.emotionalState}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              Primary State
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Sparkles size={24} color="#8A2BE2" style={{ marginBottom: 8 }} />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: "#FFFFFF",
                marginBottom: 4,
              }}
            >
              {orb.intensity}
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              Intensity
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 16,
              color: "#FFFFFF",
              marginBottom: 12,
            }}
          >
            Emotional Tags
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {orb.tags.map((tag, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "rgba(138, 43, 226, 0.2)",
                  borderRadius: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: "rgba(138, 43, 226, 0.4)",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 14,
                    color: "#8A2BE2",
                  }}
                >
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Timestamp */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <Calendar
            size={16}
            color="rgba(255, 255, 255, 0.4)"
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            {orb.timestamp}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 20,
          paddingTop: 20,
          paddingHorizontal: 20,
          backgroundColor: "rgba(10, 10, 15, 0.95)",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            onPress={handleLike}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: liked
                ? "rgba(255, 105, 180, 0.2)"
                : "rgba(255, 255, 255, 0.05)",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: liked ? "#FF69B4" : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Heart
              size={26}
              color={liked ? "#FF69B4" : "#FFFFFF"}
              fill={liked ? "#FF69B4" : "transparent"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleConnect}
            style={{
              flex: 1,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#8A2BE2",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MessageCircle size={22} color="#FFFFFF" />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
