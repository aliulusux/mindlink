import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

export function useImageSelection() {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const selectBackgroundImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setBackgroundImage(result.assets[0].uri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return {
    backgroundImage,
    selectBackgroundImage,
  };
}
