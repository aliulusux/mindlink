import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

export default function MoodOrb({
  colors = ["#8A2BE2", "#1E90FF"],
  size = 80,
  animation = "pulse",
  glowIntensity = 0.6,
}) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (animation === "pulse") {
      scale.value = withRepeat(
        withSequence(
          withSpring(1.15, { damping: 3, stiffness: 100 }),
          withSpring(1, { damping: 3, stiffness: 100 }),
        ),
        -1,
        false,
      );
    } else if (animation === "drift") {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-15, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else if (animation === "spiral") {
      rotation.value = withRepeat(
        withTiming(360, { duration: 6000, easing: Easing.linear }),
        -1,
        false,
      );
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, {
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else if (animation === "breathe") {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
      scale.value = withRepeat(
        withSequence(
          withSpring(1.08, { damping: 4, stiffness: 80 }),
          withSpring(1, { damping: 4, stiffness: 80 }),
        ),
        -1,
        false,
      );
    }
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          shadowColor: colors[0],
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: glowIntensity,
          shadowRadius: size * 0.4,
        }}
      />
    </Animated.View>
  );
}
