import Colors from "@/src/theme/colors";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
  Animated,
  Text,
  StyleSheet,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
  label: string;
  value: string;
  errorText?: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  activeColor?: string;
  inactiveColor?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  value,
  errorText,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  activeColor = "#1976D2",
  inactiveColor = "#AAA",
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelAnimatedStyle = {
    position: "absolute" as const,
    left: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isFocused ? activeColor : inactiveColor,
    ...labelStyle,
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? activeColor : Colors.divider,
        },
        containerStyle,
      ]}
    >
      <Animated.Text style={labelAnimatedStyle}>{label ?? ""}</Animated.Text>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        cursorColor="#aaa"
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        underlineColorAndroid="transparent"
        placeholder=""
        {...props}
      />

      {errorText && (
        <View style={styles.error_text_container}>
          <Feather name="info" size={12} color="red" style={{ marginTop: 2 }} />
          <Text style={styles.error_text}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 16,
    justifyContent: "center",
    color: "#000",
  },

  error_text_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
  },
  error_text: {
    color: "red",
    fontSize: 12,
    fontFamily: "Quicksand-Medium",
  },
});

export default AppTextInput;
