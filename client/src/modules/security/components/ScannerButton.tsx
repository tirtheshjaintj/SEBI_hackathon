import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface ScannerButtonProps {
  scanApps: () => void;
  apps: any[];
  loading: boolean;
  progressValue: number;
}

const ScannerButton = ({
  scanApps,
  apps,
  loading,
  progressValue,
}: ScannerButtonProps) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => scanApps());

    Keyboard.dismiss();
  };

  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.scanCenter}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={styles.scanSection}>
            {/* Animated Scan Ring */}
            <AnimatedCircularProgress
              size={moderateScale(182)}
              width={3}
              fill={progressValue}
              tintColor={Colors.primaryCyanColor}
              backgroundColor="#e0e0e0"
              rotation={0}
              style={{ position: "absolute", zIndex: 0 }}
            />

            {/* 3D Ripple Effect */}
            <View style={styles.ripple} />

            {/* Gradient Button Core */}
            <LinearGradient
              colors={["#0fd9d9", "#07b6ce", "#0c77b9"]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientWrapper}
            >
              <View style={styles.outerGlow} />
              <Text style={styles.scanText}>
                {loading
                  ? t("Scanning").toUpperCase() + "..."
                  : apps.length > 0
                  ? t("Scan Again").toUpperCase()
                  : t("Start").toUpperCase()}
              </Text>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scanCenter: {
    alignItems: "center",
    marginVertical: verticalScale(24),
    position: "relative",
  },
  buttonContainer: {
    position: "relative",
    zIndex: 2,
  },
  outerGlow: {
    position: "absolute",
    width: moderateScale(230),
    height: moderateScale(230),
    borderRadius: moderateScale(115),
    backgroundColor: Colors.primaryCyanColor,
    opacity: 0.35,
    shadowColor: Colors.primaryCyanColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    top: moderateScale(-15),
    zIndex: 0,
  },
  scanSection: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressRing: {
    position: "absolute",
    zIndex: 1,
  },
  bevel: {
    position: "absolute",
    width: moderateScale(184),
    height: moderateScale(184),
    borderRadius: moderateScale(92),
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: moderateScale(4),
    borderColor: "rgba(255,255,255,0.35)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 3,
  },
  gradientWrapper: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  innerHighlight: {
    position: "absolute",
    top: moderateScale(8),
    left: moderateScale(8),
    right: moderateScale(8),
    height: moderateScale(36),
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: moderateScale(20),
    transform: [{ rotate: "-20deg" }],
  },
  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: moderateScale(80),
    zIndex: 4,
  },
  scanText: {
    fontFamily: "Quicksand-Bold",
    fontSize: moderateScale(18),
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
    zIndex: 5,
  },
  shadow: {
    position: "absolute",
    width: moderateScale(170),
    height: moderateScale(42),
    borderRadius: moderateScale(85),
    backgroundColor: "#000",
    bottom: moderateScale(-12),
    opacity: 0.3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    zIndex: 0,
  },
  ripple: {
    position: "absolute",
    width: moderateScale(172),
    height: moderateScale(172),
    borderRadius: moderateScale(100),
    backgroundColor: "#00f0f5",
    opacity: 0.1,
    zIndex: 0,
  },
});

export default ScannerButton;
