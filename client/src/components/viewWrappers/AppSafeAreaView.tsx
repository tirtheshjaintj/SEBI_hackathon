import React from "react";
import { View } from "react-native";
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const AppSafeAreaView: React.FC<SafeAreaViewProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, style]}
    >
      {children}
    </View>
  );
};

export default AppSafeAreaView;
