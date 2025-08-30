import { Image } from "expo-image";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const SplashScreen = () => {
  const scale = useSharedValue(0.7);

  useEffect(() => {
    scale.value = withTiming(1.25, {
      duration: 1500,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <AppLinearGradient
        colors={[Colors.white, Colors.white]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <Animated.View style={[styles.logoWrapper, animatedStyle]}>
          <Image
            source={require("@/assets/images/icon.png")}
            contentFit="contain"
            style={styles.logoIcon}
            priority={"high"}
          />

          <View style={styles.logoTextWrapper}>
            <Text style={styles.logoText}>Dhan Rakshak</Text>
          </View>
        </Animated.View>

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/SEBI_LOGO.png")}
            contentFit="contain"
            style={{ width: 100, height: 100, borderRadius: 60 }}
            priority={"high"}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            color: Colors.textSecondaryDark,
            fontSize: 12,
            marginTop: 16,
            fontFamily: "Quicksand-Medium",
          }}
        >
          Powered by Securities and Exchange Board of India
        </Text>
      </AppLinearGradient>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoIcon: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 16,
    // resizeMode: "contain",
  },
  logoText: {
    // fontFamily: "Poppins-SemiBold",
    fontWeight: "700",
    fontSize: 20,
    color: Colors.textSecondaryDark,
    textAlign: "center",
  },
  logoTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
