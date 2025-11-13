import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import useMindLinkFonts from "@/hooks/useMindLinkFonts";
import { useThemeStore } from "@/utils/themeStore";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import AppHeader from "@/components/AppHeader";
import { colorPresets, shareOptions } from "./constants";
import { useMoodAnalysis } from "./hooks/useMoodAnalysis";
import { useVoiceInput } from "./hooks/useVoiceInput";
import { useImageSelection } from "./hooks/useImageSelection";
import { useArtworkExport } from "./hooks/useArtworkExport";
import { useReminders } from "./hooks/useReminders";
import { OrbPreview } from "./components/OrbPreview";
import { MoodInput } from "./components/MoodInput";
import { AdvancedFeatures } from "./components/AdvancedFeatures";
import { VoiceInputModal } from "./components/VoiceInputModal";
import { MusicSelectionModal } from "./components/MusicSelectionModal";
import { ScheduleReminderModal } from "./components/ScheduleReminderModal";
import { ShareOptionsModal } from "./components/ShareOptionsModal";

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const fontsLoaded = useMindLinkFonts();
  const { theme } = useThemeStore();

  // Core mood state
  const [moodText, setMoodText] = useState("");
  const [selectedColors, setSelectedColors] = useState(colorPresets[0].colors);
  const [selectedAnimation, setSelectedAnimation] = useState("pulse");

  // New features state
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [saveAsJournal, setSaveAsJournal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedShareOption, setSelectedShareOption] = useState(
    shareOptions[0],
  );

  // Custom hooks
  const { aiAnalyzing, aiSuggestion, handleAiAnalyze } = useMoodAnalysis();
  const {
    showVoiceModal,
    setShowVoiceModal,
    isRecording,
    voiceTranscription,
    startVoiceInput,
    handleVoiceRecord,
    applyVoiceTranscription,
  } = useVoiceInput();
  const { backgroundImage, selectBackgroundImage } = useImageSelection();
  const { exportAsArtwork } = useArtworkExport();
  const {
    scheduleReminder,
    showScheduleModal,
    setShowScheduleModal,
    scheduleCheck,
    setDailyReminder,
  } = useReminders();

  // Get word count
  const wordCount = moodText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const meetsMinimum = wordCount >= 20;

  const handleShare = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowShareModal(false);

    let message = `Mood orb created and shared to ${selectedShareOption.name}! 🌟`;

    if (saveAsJournal) {
      message += " Also saved to your private journal.";
    }

    if (scheduleReminder) {
      message += " Daily reminders activated!";
    }

    Alert.alert("Success", message);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar style="light" />
        <AppHeader />

        {/* Ambient background */}
        <LinearGradient
          colors={[theme.colors.gradient1, theme.colors.gradient2]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "70%",
            height: "50%",
          }}
        />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: insets.bottom + 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 32,
                color: theme.colors.text,
                marginBottom: 8,
              }}
            >
              AI Mood Creator
            </Text>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 16,
                color: theme.colors.textSecondary,
              }}
            >
              Describe yourself in detail - let AI craft your perfect mood
            </Text>
          </View>

          {/* Orb Preview */}
          <OrbPreview
            backgroundImage={backgroundImage}
            selectedColors={selectedColors}
            selectedAnimation={selectedAnimation}
            moodIntensity={moodIntensity}
            theme={theme}
          />

          {/* Mood Input */}
          <MoodInput
            moodText={moodText}
            setMoodText={setMoodText}
            wordCount={wordCount}
            meetsMinimum={meetsMinimum}
            aiAnalyzing={aiAnalyzing}
            aiSuggestion={aiSuggestion}
            onVoicePress={startVoiceInput}
            onAnalyzePress={() =>
              handleAiAnalyze(
                moodText,
                meetsMinimum,
                setSelectedColors,
                setSelectedAnimation,
                setSelectedMusic,
              )
            }
            theme={theme}
          />

          {/* Advanced Features */}
          <AdvancedFeatures
            moodIntensity={moodIntensity}
            setMoodIntensity={setMoodIntensity}
            backgroundImage={backgroundImage}
            onSelectImage={selectBackgroundImage}
            selectedMusic={selectedMusic}
            onMusicPress={() => setShowMusicModal(true)}
            onExportPress={exportAsArtwork}
            saveAsJournal={saveAsJournal}
            setSaveAsJournal={setSaveAsJournal}
            scheduleReminder={scheduleReminder}
            onSchedulePress={scheduleCheck}
            theme={theme}
          />

          {/* Share Button */}
          <TouchableOpacity
            onPress={() => setShowShareModal(true)}
            disabled={!meetsMinimum || aiAnalyzing}
            style={{
              backgroundColor:
                meetsMinimum && !aiAnalyzing
                  ? theme.colors.primary
                  : theme.colors.surface,
              borderRadius: 16,
              padding: 18,
              alignItems: "center",
              borderWidth: 1,
              borderColor:
                meetsMinimum && !aiAnalyzing
                  ? theme.colors.primary
                  : theme.colors.border,
            }}
          >
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 18,
                color:
                  meetsMinimum && !aiAnalyzing
                    ? "#FFFFFF"
                    : theme.colors.textSecondary,
              }}
            >
              Create & Share Mood Orb
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Voice Input Modal */}
        <VoiceInputModal
          visible={showVoiceModal}
          onClose={() => setShowVoiceModal(false)}
          isRecording={isRecording}
          voiceTranscription={voiceTranscription}
          onRecord={handleVoiceRecord}
          onUseTranscription={() => applyVoiceTranscription(setMoodText)}
          theme={theme}
        />

        {/* Music Selection Modal */}
        <MusicSelectionModal
          visible={showMusicModal}
          onClose={() => setShowMusicModal(false)}
          selectedMusic={selectedMusic}
          onSelectMusic={setSelectedMusic}
          theme={theme}
        />

        {/* Schedule Reminder Modal */}
        <ScheduleReminderModal
          visible={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          onSetReminder={setDailyReminder}
          theme={theme}
        />

        {/* Share Options Modal */}
        <ShareOptionsModal
          visible={showShareModal}
          onClose={() => setShowShareModal(false)}
          selectedShareOption={selectedShareOption}
          onSelectShareOption={setSelectedShareOption}
          onShare={handleShare}
          insets={insets}
          theme={theme}
        />
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
