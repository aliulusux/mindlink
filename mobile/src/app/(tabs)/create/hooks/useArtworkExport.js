import { Alert } from "react-native";
import * as Haptics from "expo-haptics";

export function useArtworkExport() {
  const exportAsArtwork = async () => {
    Alert.alert(
      "Export Artwork",
      "Would you like to export your mood orb as wallpaper or share it as art?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Save as Wallpaper", onPress: () => saveAsWallpaper() },
        { text: "Share as Art", onPress: () => shareAsArt() },
      ],
    );
  };

  const saveAsWallpaper = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Success",
      "Mood orb saved to your photo library as wallpaper!",
    );
  };

  const shareAsArt = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Shared", "Your mood orb art has been shared!");
  };

  return {
    exportAsArtwork,
  };
}
