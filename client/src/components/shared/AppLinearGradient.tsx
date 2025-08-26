import React from "react";
import { StyleProp, ViewStyle, ColorValue } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

interface AppLinearGradientProps extends Partial<LinearGradientProps> {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  [key: string]: any;
}

const AppLinearGradient = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  className,
  style,
  children,
  ...props
}: AppLinearGradientProps) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={style}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default AppLinearGradient;
