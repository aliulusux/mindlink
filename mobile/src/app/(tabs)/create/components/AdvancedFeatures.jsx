import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import {
  Zap,
  ImageIcon,
  Headphones,
  Download,
  BookOpen,
  Calendar,
} from "lucide-react-native";
import { Slider } from "./Slider";

export function AdvancedFeatures({
  moodIntensity,
  setMoodIntensity,
  backgroundImage,
  onSelectImage,
  selectedMusic,
  onMusicPress,
  onExportPress,
  saveAsJournal,
  setSaveAsJournal,
  scheduleReminder,
  onSchedulePress,
  theme,
}) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text
        style={{
          fontFamily: "PTSans_700Bold",
          fontSize: 18,
          color: theme.colors.text,
          marginBottom: 16,
        }}
      >
        Advanced Features
      </Text>

      {/* Row 1 */}
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
        {/* Mood Intensity */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Zap
              size={16}
              color={theme.colors.primary}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 14,
                color: theme.colors.text,
              }}
            >
              Intensity
            </Text>
          </View>
          <Slider
            style={{ width: "100%", height: 20 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={moodIntensity}
            onValueChange={setMoodIntensity}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbStyle={{ backgroundColor: theme.colors.primary }}
          />
        </View>

        {/* Background Photo */}
        <TouchableOpacity
          onPress={onSelectImage}
          style={{
            flex: 1,
            backgroundColor: backgroundImage
              ? `${theme.colors.primary}20`
              : theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: backgroundImage
              ? theme.colors.primary
              : theme.colors.border,
            alignItems: "center",
          }}
        >
          <ImageIcon
            size={20}
            color={
              backgroundImage
                ? theme.colors.primary
                : theme.colors.textSecondary
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 12,
              color: backgroundImage
                ? theme.colors.primary
                : theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            {backgroundImage ? "Photo Added" : "Add Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
        {/* Music Recommendation */}
        <TouchableOpacity
          onPress={onMusicPress}
          style={{
            flex: 1,
            backgroundColor: selectedMusic
              ? `${theme.colors.secondary}20`
              : theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: selectedMusic
              ? theme.colors.secondary
              : theme.colors.border,
            alignItems: "center",
          }}
        >
          <Headphones
            size={20}
            color={
              selectedMusic
                ? theme.colors.secondary
                : theme.colors.textSecondary
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 12,
              color: selectedMusic
                ? theme.colors.secondary
                : theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            {selectedMusic ? selectedMusic.name : "Music Match"}
          </Text>
        </TouchableOpacity>

        {/* Export as Artwork */}
        <TouchableOpacity
          onPress={onExportPress}
          style={{
            flex: 1,
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            alignItems: "center",
          }}
        >
          <Download
            size={20}
            color={theme.colors.textSecondary}
            style={{ marginBottom: 4 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 12,
              color: theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            Export Art
          </Text>
        </TouchableOpacity>
      </View>

      {/* Row 3 - Settings */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* Journal Toggle */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BookOpen
              size={16}
              color={theme.colors.primary}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 12,
                color: theme.colors.text,
              }}
            >
              Save to Journal
            </Text>
          </View>
          <Switch
            value={saveAsJournal}
            onValueChange={setSaveAsJournal}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Schedule Reminder */}
        <TouchableOpacity
          onPress={onSchedulePress}
          style={{
            flex: 1,
            backgroundColor: scheduleReminder
              ? `${theme.colors.primary}20`
              : theme.colors.surface,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: scheduleReminder
              ? theme.colors.primary
              : theme.colors.border,
            alignItems: "center",
          }}
        >
          <Calendar
            size={20}
            color={
              scheduleReminder
                ? theme.colors.primary
                : theme.colors.textSecondary
            }
            style={{ marginBottom: 4 }}
          />
          <Text
            style={{
              fontFamily: "PTSans_700Bold",
              fontSize: 12,
              color: scheduleReminder
                ? theme.colors.primary
                : theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            {scheduleReminder ? "Reminders On" : "Schedule"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
