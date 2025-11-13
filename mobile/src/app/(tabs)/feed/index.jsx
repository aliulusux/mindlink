import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart, MessageCircle } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import useMindLinkFonts from "../../../hooks/useMindLinkFonts";
import { useThemeStore } from "../../../utils/themeStore";
import MoodOrb from "../../../components/MoodOrb";
import AppHeader from "../../../components/AppHeader";

const mockMoods = [
  {
    id: "1",
    colors: ["#FF6B9D", "#C06595", "#845EC2"],
    animation: "pulse",
    mood: "Hopeful & Excited",
    description: "Feeling like something amazing is about to happen",
    wavelength: 94,
    time: "2 hours ago",
    anonymous: true,
    liked: false,
  },
  {
    id: "2",
    colors: ["#1E90FF", "#4169E1", "#00CED1"],
    animation: "drift",
    mood: "Calm Reflection",
    description: "Taking time to process everything",
    wavelength: 87,
    time: "5 hours ago",
    anonymous: true,
    liked: false,
  },
  {
    id: "3",
    colors: ["#FFD700", "#FFA500", "#FF8C00"],
    animation: "breathe",
    mood: "Creative Flow",
    description: "Ideas flowing freely today",
    wavelength: 92,
    time: "1 day ago",
    anonymous: true,
    liked: false,
  },
  {
    id: "4",
    colors: ["#9370DB", "#8A2BE2", "#9400D3"],
    animation: "spiral",
    mood: "Reflective",
    description: "Thinking about life's mysteries",
    wavelength: 78,
    time: "2h ago",
    anonymous: true,
  },
  {
    id: "5",
    colors: ["#32CD32", "#00FA9A", "#3CB371"],
    animation: "pulse",
    mood: "Grateful",
    description: "Appreciating the little things today",
    wavelength: 88,
    time: "3h ago",
    anonymous: true,
  },
  {
    id: "6",
    colors: ["#FF69B4", "#FF1493", "#DB7093"],
    animation: "drift",
    mood: "Loving",
    description: "Sending positive vibes to everyone",
    wavelength: 94,
    time: "5h ago",
    anonymous: true,
  },
];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fontsLoaded = useMindLinkFonts();
  const { theme } = useThemeStore();
  const [refreshing, setRefreshing] = useState(false);
  const [moods, setMoods] = useState(mockMoods);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Simulate fetching new mood orbs
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Shuffle the orbs to simulate new content
    const shuffled = [...moods].sort(() => Math.random() - 0.5);
    setMoods(shuffled);

    setRefreshing(false);
  }, [moods]);

  const handleOrbPress = useCallback(
    (id) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push(`/(tabs)/feed/${id}`);
    },
    [router],
  );

  const handleLike = useCallback((id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMoods((prev) =>
      prev.map((mood) =>
        mood.id === id ? { ...mood, liked: !mood.liked } : mood,
      ),
    );
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppHeader />

      <LinearGradient
        colors={[theme.colors.gradient1, "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "70%",
          height: "40%",
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 16,
            color: theme.colors.textSecondary,
            marginBottom: 24,
          }}
        >
          Discover emotional wavelengths
        </Text>

        {/* Mood Feed */}
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            onPress={() => handleOrbPress(mood.id)}
            activeOpacity={0.9}
            style={{
              marginBottom: 32,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 24,
                padding: 24,
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <MoodOrb
                  colors={mood.colors}
                  size={160}
                  animation={mood.animation}
                  glowIntensity={0.6}
                />
              </View>

              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <View
                  style={{
                    backgroundColor: `${theme.colors.primary}30`,
                    borderRadius: 16,
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PTSans_700Bold",
                      fontSize: 16,
                      color: theme.colors.primary,
                    }}
                  >
                    {mood.wavelength}% Match
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 22,
                  color: theme.colors.text,
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                {mood.mood}
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 15,
                  color: theme.colors.textSecondary,
                  lineHeight: 22,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {mood.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_400Regular",
                    fontSize: 13,
                    color: theme.colors.textTertiary,
                  }}
                >
                  {mood.time}
                </Text>

                <View style={{ flexDirection: "row", gap: 16 }}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLike(mood.id);
                    }}
                    style={{ padding: 4 }}
                  >
                    <Heart
                      size={22}
                      color={
                        mood.liked ? "#FF69B4" : theme.colors.textSecondary
                      }
                      fill={mood.liked ? "#FF69B4" : "transparent"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 4 }}>
                    <MessageCircle
                      size={22}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
