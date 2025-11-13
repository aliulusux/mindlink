import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import useMindLinkFonts from "../hooks/useMindLinkFonts";

export default function LoadingScreen() {
  const router = useRouter();
  const fontsLoaded = useMindLinkFonts();

  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Pulsing animation
    scale.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 3, stiffness: 100 }),
        withSpring(1, { damping: 3, stiffness: 100 }),
      ),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );

    // Navigate to feed after 3 seconds
    const timeout = setTimeout(() => {
      router.replace("/(tabs)/feed");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      {/* Ambient background gradients */}
      <LinearGradient
        colors={["rgba(138, 43, 226, 0.15)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "60%",
        }}
      />

      <LinearGradient
        colors={["rgba(30, 144, 255, 0.15)", "transparent"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "60%",
          height: "60%",
        }}
      />

      {/* Content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        {/* Logo */}
        <Animated.View style={[pulseStyle, { marginBottom: 40 }]}>
          <Image
            source={{
              uri: "https://ucarecdn.com/851c9a95-cf86-442e-8654-9b67b70706d3/-/format/auto/",
            }}
            style={{ width: 180, height: 180 }}
            contentFit="contain"
            transition={300}
          />
        </Animated.View>

        {/* App Name */}
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 36,
            color: "#FFFFFF",
            marginBottom: 12,
          }}
        >
          MindLink
        </Text>

        {/* Tagline */}
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
          }}
        >
          Connect through emotions
        </Text>
      </View>
    </View>
  );
}
