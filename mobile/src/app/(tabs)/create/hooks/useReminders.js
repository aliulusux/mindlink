import { useState } from "react";
import { Alert } from "react-native";
import * as Haptics from "expo-haptics";

export function useReminders() {
  const [scheduleReminder, setScheduleReminder] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const scheduleCheck = () => {
    setShowScheduleModal(true);
  };

  const setDailyReminder = () => {
    setScheduleReminder(true);
    setShowScheduleModal(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Reminder Set", "You'll get daily mood check-ins at 8 PM!");
  };

  return {
    scheduleReminder,
    showScheduleModal,
    setShowScheduleModal,
    scheduleCheck,
    setDailyReminder,
  };
}
