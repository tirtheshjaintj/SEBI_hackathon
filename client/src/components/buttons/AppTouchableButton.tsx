import Colors from "@/src/theme/colors";
import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import Loader from "../loaders/Loader";
import AppLinearGradient from "../shared/AppLinearGradient";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";

interface AppTouchableButtonProps {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
  loaderSize?: "large" | "small";
}

const AppTouchableButton = ({
  text,
  onPress,
  isLoading,
  textStyle,
  loaderSize,
  disabled = false,
  style,
}: AppTouchableButtonProps) => {
  const isDisabled = useMemo(
    () => disabled || isLoading,
    [disabled, isLoading]
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading || disabled}
      accessibilityRole="button"
    >
      <AppLinearGradient
        colors={[Colors.primaryCyanColor, Colors.primaryBackground]}
        style={[styles.button, style, { opacity: isDisabled ? 0.5 : 1 }]}
      >
        {!isLoading ? (
          <Text style={[styles.button_text, textStyle]}>{text ?? ""}</Text>
        ) : (
          <Loader size={loaderSize ?? "large"} loaderColor="white" />
        )}
      </AppLinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(24),
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
  },
  button_text: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: Colors.white,
    fontSize: scale(16),
  },
});

export default AppTouchableButton;
