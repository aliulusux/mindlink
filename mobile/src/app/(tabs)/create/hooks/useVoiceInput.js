import { useState } from "react";
import { Alert } from "react-native";
import {
  useAudioRecorder,
  useAudioRecorderState,
  requestRecordingPermissionsAsync,
  RecordingPresets,
} from "expo-audio";

export function useVoiceInput() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscription, setVoiceTranscription] = useState("");

  const startVoiceInput = async () => {
    const { granted } = await requestRecordingPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Microphone access is needed for voice input",
      );
      return;
    }
    setShowVoiceModal(true);
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      await recorder.stop();
      setIsRecording(false);
      setTimeout(() => {
        const mockTranscription =
          "I'm feeling really creative today and excited about new possibilities ahead of me. There's this sense of wonder and anticipation that's filling my heart with warmth and hope.";
        setVoiceTranscription(mockTranscription);
      }, 2000);
    } else {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecording(true);
    }
  };

  const applyVoiceTranscription = (setMoodText) => {
    setMoodText(voiceTranscription);
    setShowVoiceModal(false);
    setVoiceTranscription("");
  };

  return {
    showVoiceModal,
    setShowVoiceModal,
    isRecording,
    voiceTranscription,
    startVoiceInput,
    handleVoiceRecord,
    applyVoiceTranscription,
  };
}
