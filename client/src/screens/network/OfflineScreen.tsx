import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
 } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import Colors from "@/src/theme/colors";
import Loader from "@/src/components/loaders/Loader";

interface NetworkOfflineScreenProps {
  onRetry?: () => void;
  onConnectionRestored?: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const NetworkOfflineScreen = ({
  onRetry,
  onConnectionRestored,
}: NetworkOfflineScreenProps) => {
  const netInfo = useNetInfo();
  const [isRetrying, setIsRetrying] = useState(false);
  const pulseAnim = useSharedValue(0);
  const buttonScale = useSharedValue(1);
 
  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.ease }),
        withTiming(0, { duration: 1000, easing: Easing.ease })
      ),
      -1,
      true
    );
  }, []);

  
  useEffect(() => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      if (onConnectionRestored) onConnectionRestored();
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  const handleRetry = async () => {
    buttonScale.value = withTiming(0.95, { duration: 100 });
    setIsRetrying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (netInfo.isConnected && netInfo.isInternetReachable) {
        if (onConnectionRestored) onConnectionRestored();
      } else if (onRetry) {
        onRetry();
      }
    } finally {
      buttonScale.value = withTiming(1, { duration: 100 });
      setIsRetrying(false);
    }
  };

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [0.9, 1.1]);
    return {
      transform: [{ scale }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  return (
    <ModalWrapper
      visible={!netInfo.isConnected || !netInfo.isInternetReachable}
      onClose={() => {}}
      animationType="fade"
      disableTouchClose={true}
    >
      <LinearGradient
        colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Animated.View
          style={styles.content}
          entering={FadeInUp.duration(800)}
          exiting={FadeOut}
        >
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <Ionicons name="wifi" size={80} color="#fff" />
          </Animated.View>

          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.message}>
            Oops! It seems you are offline. Please check your network
            connection.
          </Text>

          <AnimatedTouchable
            style={[styles.retryButton, buttonAnimatedStyle]}
            onPress={handleRetry}
            disabled={isRetrying}
            activeOpacity={0.7}
          >
            {isRetrying ? (
              <Loader />
            ) : (
              <>
                <Ionicons
                  name="refresh"
                  size={20}
                  color={Colors.primaryCyanColor}
                  style={styles.retryIcon}
                />
                <Text style={styles.retryText}>Retry Connection</Text>
              </>
            )}
          </AnimatedTouchable>
        </Animated.View>
      </LinearGradient>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    color:Colors.primaryCyanColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NetworkOfflineScreen;
