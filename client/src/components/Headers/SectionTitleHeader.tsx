import React, { memo } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
 import Colors from "@/src/theme/colors";
import AppLinearGradient from "../shared/AppLinearGradient";

interface Props {
  title: string;
  underlineHeight?: number;
  border?: boolean;
  colors?: [ColorValue, ColorValue];
  lineWidth?: number;
}

const SectionTitleHeader = ({
  title,
  underlineHeight,
  colors,
  border = true,
  lineWidth,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>{title}</Text>
      {border && (
        <AppLinearGradient
          style={[
            styles.underline,
            { height: underlineHeight ?? 1, width: lineWidth ?? 157 },
          ]}
          colors={colors ?? [Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
        >
          <View />
        </AppLinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  title_text: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Poppins-SemiBold",
    color: Colors.textGraySecondary,
  },
  underline: {
    height: 4,
    width: 157,
    borderRadius: 3,
  },
});

export default memo(SectionTitleHeader);
