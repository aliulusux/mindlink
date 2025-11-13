import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Mic, X, Square } from "lucide-react-native";

export function VoiceInputModal({
  visible,
  onClose,
  isRecording,
  voiceTranscription,
  onRecord,
  onUseTranscription,
  theme,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 24,
            padding: 24,
            width: "100%",
            maxWidth: 400,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Mic
              size={24}
              color={theme.colors.primary}
              style={{ marginRight: 12 }}
            />
            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 24,
                color: theme.colors.text,
                flex: 1,
              }}
            >
              Voice Input
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: theme.colors.surface,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <X size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <TouchableOpacity
              onPress={onRecord}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: isRecording
                  ? theme.colors.error
                  : theme.colors.primary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              {isRecording ? (
                <Square size={40} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Mic size={40} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "PTSans_700Bold",
                fontSize: 16,
                color: theme.colors.text,
                marginBottom: 4,
              }}
            >
              {isRecording ? "Recording..." : "Tap to Record"}
            </Text>

            {isRecording && (
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                }}
              >
                Speak for at least 20 words
              </Text>
            )}
          </View>

          {voiceTranscription ? (
            <View>
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: theme.colors.text,
                  marginBottom: 8,
                }}
              >
                Transcription:
              </Text>
              <Text
                style={{
                  fontFamily: "PTSans_400Regular",
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  backgroundColor: theme.colors.surface,
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                {voiceTranscription}
              </Text>
              <TouchableOpacity
                onPress={onUseTranscription}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PTSans_700Bold",
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  Use This Text
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
