import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Mic, Sparkles } from "lucide-react-native";

export function MoodInput({
  moodText,
  setMoodText,
  wordCount,
  meetsMinimum,
  aiAnalyzing,
  aiSuggestion,
  onVoicePress,
  onAnalyzePress,
  theme,
}) {
  return (
    <View style={{ marginBottom: 32 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "PTSans_700Bold",
            fontSize: 18,
            color: theme.colors.text,
          }}
        >
          Describe Yourself ({wordCount}/20+ words)
        </Text>
        <TouchableOpacity
          onPress={onVoicePress}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: theme.colors.border,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Mic
            size={16}
            color={theme.colors.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 12,
              color: theme.colors.primary,
            }}
          >
            Voice
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: meetsMinimum
            ? theme.colors.primary
            : theme.colors.border,
          padding: 16,
          fontFamily: "PTSans_400Regular",
          fontSize: 16,
          color: theme.colors.text,
          minHeight: 120,
          textAlignVertical: "top",
        }}
        placeholder="Describe how you feel, what you're thinking, your current state of mind, hopes, fears, dreams... The more detail, the better AI understands you."
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        value={moodText}
        onChangeText={setMoodText}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 12,
            color: meetsMinimum
              ? theme.colors.primary
              : theme.colors.textSecondary,
          }}
        >
          {meetsMinimum
            ? "✓ Ready for AI analysis"
            : `Need ${20 - wordCount} more words`}
        </Text>
        <Text
          style={{
            fontFamily: "PTSans_400Regular",
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          {wordCount} words
        </Text>
      </View>

      <TouchableOpacity
        onPress={onAnalyzePress}
        disabled={!meetsMinimum || aiAnalyzing}
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            meetsMinimum && !aiAnalyzing
              ? theme.colors.primary
              : theme.colors.surface,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor:
            meetsMinimum && !aiAnalyzing
              ? theme.colors.primary
              : theme.colors.border,
        }}
      >
        {aiAnalyzing ? (
          <>
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              AI Analyzing Your Mood...
            </Text>
          </>
        ) : (
          <>
            <Sparkles
              size={20}
              color={meetsMinimum ? "#FFFFFF" : theme.colors.textSecondary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: meetsMinimum ? "#FFFFFF" : theme.colors.textSecondary,
              }}
            >
              Let AI Choose Colors & Motion
            </Text>
          </>
        )}
      </TouchableOpacity>

      {aiSuggestion ? (
        <View
          style={{
            marginTop: 16,
            backgroundColor: `${theme.colors.primary}10`,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: `${theme.colors.primary}30`,
          }}
        >
          <Text
            style={{
              fontFamily: "PTSans_400Regular",
              fontSize: 14,
              color: theme.colors.text,
              lineHeight: 20,
            }}
          >
            {aiSuggestion}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
