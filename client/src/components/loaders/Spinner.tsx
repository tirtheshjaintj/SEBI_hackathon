import React from "react";
import { Svg, Circle, Path } from "react-native-svg";
import { StyleSheet, Animated, Easing } from "react-native";

export default function Spinner() {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
      <Svg height="24" width="24" viewBox="0 0 24 24">
        <Circle
          cx="12"
          cy="12"
          r="10"
          stroke="orange"
          strokeWidth="2"
          opacity={0.2}
        />
        <Path
          d="M12 2a10 10 0 0 1 0 20"
          stroke="orange"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={0.9}
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    height: 24,
    width: 24,
  },
});
