import Colors from "@/src/theme/colors";
import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = ({
  loaderColor,
  size = "large",
}: {
  loaderColor?: string;
  size?: "large" | "small";
}) => (
  <View className="flex items-center justify-center py-4">
    <ActivityIndicator
      size={size}
      color={loaderColor ? loaderColor : Colors.primaryCyanColor}
    />
  </View>
);

export default Loader;
