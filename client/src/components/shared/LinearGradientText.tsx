import React from "react";
import { Text, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

interface LinearGradientTextProps {
  startColor: string;
  endColor: string;
  style?: TextStyle | TextStyle[];
  text?: string;
  [key: string]: any;
}

const LinearGradientText: React.FC<LinearGradientTextProps> = ({
  startColor,
  endColor,
  text,
  style,
  ...props
}) => {
  return (
    <MaskedView
      maskElement={
        <Text {...props} style={[style, { opacity: 1 }]}>
          {text}
        </Text>
      }
    >
      <LinearGradient
        colors={[startColor, endColor]}
        start={[0, 0]}
        locations={[0, 0.5]}
        end={[1, 1]}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default LinearGradientText;
