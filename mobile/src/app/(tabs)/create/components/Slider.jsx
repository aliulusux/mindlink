import React, { useState } from "react";
import { View, PanResponder } from "react-native";

export function Slider({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step,
  minimumTrackTintColor,
  maximumTrackTintColor,
  style,
  thumbStyle,
}) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const trackHeight = 4;
  const thumbSize = 20;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      updateValue(evt.nativeEvent.locationX);
    },
    onPanResponderMove: (evt) => {
      updateValue(evt.nativeEvent.locationX);
    },
  });

  const updateValue = (x) => {
    if (sliderWidth === 0) return;

    const percentage = Math.max(0, Math.min(1, x / sliderWidth));
    const range = maximumValue - minimumValue;
    let newValue = minimumValue + percentage * range;

    if (step) {
      newValue = Math.round(newValue / step) * step;
    }

    newValue = Math.max(minimumValue, Math.min(maximumValue, newValue));
    onValueChange(newValue);
  };

  const percentage =
    ((value - minimumValue) / (maximumValue - minimumValue)) * 100;

  return (
    <View
      style={[{ height: 40, justifyContent: "center" }, style]}
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      <View
        style={{
          height: trackHeight,
          backgroundColor: maximumTrackTintColor,
          borderRadius: trackHeight / 2,
        }}
      >
        <View
          style={{
            height: trackHeight,
            width: `${percentage}%`,
            backgroundColor: minimumTrackTintColor,
            borderRadius: trackHeight / 2,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          left: `${percentage}%`,
          marginLeft: -thumbSize / 2,
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          backgroundColor: thumbStyle?.backgroundColor || minimumTrackTintColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
    </View>
  );
}
