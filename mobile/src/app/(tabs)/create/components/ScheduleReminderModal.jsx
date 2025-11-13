import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar, X } from "lucide-react-native";

export function ScheduleReminderModal({
  visible,
  onClose,
  onSetReminder,
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
            <Calendar
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
              Schedule Check-ins
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

          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PTSans_400Regular",
                fontSize: 16,
                color: theme.colors.text,
                lineHeight: 24,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Set daily mood check-in reminders to track your emotional patterns
              over time.
            </Text>

            <TouchableOpacity
              onPress={onSetReminder}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                Set Daily Reminder (8 PM)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <Text
                style={{
                  fontFamily: "PTSans_700Bold",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
