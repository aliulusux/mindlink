import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Pause, RotateCcw } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useMindLinkFonts from "@/hooks/useMindLinkFonts";
import { useThemeStore } from "@/utils/themeStore";
import AppHeader from "@/components/AppHeader";

const breathingPatterns = {
  calm: { inhale: 4, hold: 4, exhale: 6, name: "Calm & Relax" },
  energy: { inhale: 4, hold: 0, exhale: 4, name: "Energy Boost" },
  focus: { inhale: 4, hold: 7, exhale: 8, name: "Deep Focus" },
  sleep: { inhale: 4, hold: 7, exhale: 8, name: "Sleep Ready" },
};

export default function BreatheScreen() {
  const insets = useSafeAreaInsets();
  const fontsLoaded = useMindLinkFonts();
  const { theme } = useThemeStore();
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [countdown, setCountdown] = useState(4);
  const [pattern, setPattern] = useState("calm");
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      const currentPattern = breathingPatterns[pattern];
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;

          if (phase === "inhale") {
            if (currentPattern.hold > 0) {
              setPhase("hold");
              return currentPattern.hold;
            } else {
              setPhase("exhale");
              return currentPattern.exhale;
            }
          } else if (phase === "hold") {
            setPhase("exhale");
            return currentPattern.exhale;
          } else {
            setPhase("inhale");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            return currentPattern.inhale;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, phase, pattern]);

  useEffect(() => {
    if (isBreathing) {
      const currentPattern = breathingPatterns[pattern];
      const duration =
        phase === "inhale"
          ? currentPattern.inhale * 1000
          : phase === "hold"
            ? currentPattern.hold * 1000
            : currentPattern.exhale * 1000;

      if (phase === "inhale") {
        scale.value = withTiming(1.5, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
      } else if (phase === "hold") {
        // Stay at current size
      } else {
        scale.value = withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(0.5, {
          duration,
          easing: Easing.inOut(Easing.ease),
        });
      }
    } else {
      cancelAnimation(scale);
      cancelAnimation(opacity);
      scale.value = withTiming(1, { duration: 500 });
      opacity.value = withTiming(0.5, { duration: 500 });
    }
  }, [isBreathing, phase]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isBreathing) {
      setIsBreathing(false);
      setPhase("inhale");
      setCountdown(breathingPatterns[pattern].inhale);
    } else {
      setIsBreathing(true);
    }
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsBreathing(false);
    setPhase("inhale");
    setCountdown(breathingPatterns[pattern].inhale);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="light" />
      <AppHeader />

      <LinearGradient
        colors={[theme.colors.gradient1, theme.colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Breathing Orb */}
        <Animated.View style={[animatedStyle, { marginBottom: 60 }]}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 64,
                color: "#FFFFFF",
              }}
            >
              {countdown}
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Phase Text */}
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 32,
            color: theme.colors.text,
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          {phase}
        </Text>
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 18,
            color: theme.colors.textSecondary,
            marginBottom: 40,
          }}
        >
          {breathingPatterns[pattern].name}
        </Text>

        {/* Controls */}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={handleToggle}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isBreathing ? (
              <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReset}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RotateCcw size={28} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Pattern Selection */}
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 16,
              color: theme.colors.text,
              marginBottom: 12,
            }}
          >
            Choose Pattern
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {Object.entries(breathingPatterns).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  Haptics.selectionAsync();
                  setPattern(key);
                  setPhase("inhale");
                  setCountdown(value.inhale);
                  setIsBreathing(false);
                }}
                style={{
                  backgroundColor:
                    pattern === key
                      ? theme.colors.primary
                      : theme.colors.surface,
                  borderRadius: 20,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor:
                    pattern === key
                      ? theme.colors.primary
                      : theme.colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 14,
                    color: pattern === key ? "#FFFFFF" : theme.colors.text,
                  }}
                >
                  {value.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
