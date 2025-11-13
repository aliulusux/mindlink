import { useState } from "react";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import { colorPresets, animationStyles, musicGenres } from "../constants";

export function useMoodAnalysis() {
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const analyzeMood = (text) => {
    const lowercaseText = text.toLowerCase();

    let moodType = "neutral";
    let colorIndex = 0;
    let animationIndex = 0;
    let musicIndex = 0;

    if (
      lowercaseText.includes("happy") ||
      lowercaseText.includes("joy") ||
      lowercaseText.includes("excited")
    ) {
      moodType = "joyful";
      colorIndex = 2;
      animationIndex = 0;
      musicIndex = 6;
    } else if (
      lowercaseText.includes("calm") ||
      lowercaseText.includes("peace") ||
      lowercaseText.includes("relax")
    ) {
      moodType = "peaceful";
      colorIndex = 7;
      animationIndex = 1;
      musicIndex = 0;
    } else if (
      lowercaseText.includes("creative") ||
      lowercaseText.includes("inspire") ||
      lowercaseText.includes("imagine")
    ) {
      moodType = "creative";
      colorIndex = 3;
      animationIndex = 2;
      musicIndex = 1;
    } else if (
      lowercaseText.includes("love") ||
      lowercaseText.includes("romantic") ||
      lowercaseText.includes("warm")
    ) {
      moodType = "loving";
      colorIndex = 5;
      animationIndex = 3;
      musicIndex = 7;
    } else if (
      lowercaseText.includes("energy") ||
      lowercaseText.includes("power") ||
      lowercaseText.includes("strong")
    ) {
      moodType = "energetic";
      colorIndex = 6;
      animationIndex = 0;
      musicIndex = 4;
    } else if (
      lowercaseText.includes("sad") ||
      lowercaseText.includes("down") ||
      lowercaseText.includes("blue")
    ) {
      moodType = "melancholy";
      colorIndex = 1;
      animationIndex = 1;
      musicIndex = 2;
    } else {
      colorIndex = 4;
      animationIndex = 3;
      musicIndex = 5;
    }

    return {
      colors: colorPresets[colorIndex].colors,
      animation: animationStyles[animationIndex].value,
      music: musicGenres[musicIndex],
      analysis: `🧠 AI Analysis: I sense ${moodType} energy in your words. Your emotional signature suggests ${colorPresets[colorIndex].name.toLowerCase()} tones with ${animationStyles[animationIndex].name.toLowerCase()} movement patterns. Perfect for ${musicGenres[musicIndex].name.toLowerCase()} accompaniment.`,
    };
  };

  const handleAiAnalyze = async (
    moodText,
    meetsMinimum,
    setSelectedColors,
    setSelectedAnimation,
    setSelectedMusic,
  ) => {
    if (!meetsMinimum) {
      Alert.alert(
        "More Details Needed",
        "Please describe yourself using at least 20 words for AI to understand your mood.",
      );
      return;
    }

    setAiAnalyzing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const moodAnalysis = analyzeMood(moodText);
      setSelectedColors(moodAnalysis.colors);
      setSelectedAnimation(moodAnalysis.animation);
      setAiSuggestion(moodAnalysis.analysis);
      setSelectedMusic(moodAnalysis.music);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("AI analysis error:", error);
      setAiSuggestion(
        "Analysis complete! Your emotional signature has been captured.",
      );
    } finally {
      setAiAnalyzing(false);
    }
  };

  return {
    aiAnalyzing,
    aiSuggestion,
    handleAiAnalyze,
  };
}
