import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

interface Props {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  close?: () => void;
  backdropColor?: string;
  blur?: boolean;
  blurIntensity?: number;
  blurTint?: "light" | "dark" | "default";
}

const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  close,
  backdropColor = "black",
  blur = false,
  blurIntensity = 50,
  blurTint = "light",
}: Props) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5],
      "clamp"
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View style={[styles.container, backDropAnimation]}>
        {blur ? (
          <BlurView
            intensity={blurIntensity}
            tint={blurTint}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: backdropColor },
            ]}
          />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "none",
    flex: 1,
  },
});

export default BackDrop;
