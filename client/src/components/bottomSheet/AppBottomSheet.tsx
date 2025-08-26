import React, {
  RefObject,
  useCallback,
  useImperativeHandle
} from "react";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import BackDrop from "./BackDrop";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AppBottomSheetProps {
  snapTo?: string;
  draggable?: boolean;
  backgroundColor?: string;
  backdropColor?: string;
  onCloseHandler?: () => void;
  onOpenHandler?: () => void;
  blur?: boolean;
  blurIntensity?: number;
  blurTint?: "light" | "dark" | "default";
  bottomSheetRef: RefObject<AppBottomSheetRefType | null>;
  children: React.ReactNode;
}

export type AppBottomSheetRefType = {
  expand: () => void;
  close: () => void;
};

const AppBottomSheet = ({
  draggable = true,
  snapTo = "50%", // default to 50%
  backgroundColor = "white",
  backdropColor = "black",
  onCloseHandler,
  onOpenHandler,
  blur = false,
  blurIntensity = 50,
  blurTint = "default",
  bottomSheetRef,
  children,
}: AppBottomSheetProps) => {
  const closeHeight = SCREEN_HEIGHT + StyleSheet.hairlineWidth * 100; // flexible and safe

  const percentage = parseFloat(snapTo.replace("%", "")) / 100;
  const initialSnapHeight = SCREEN_HEIGHT - SCREEN_HEIGHT * percentage; // 50%
  const fullSnapHeight = 0;
  const secondarySnapHeight = SCREEN_HEIGHT - SCREEN_HEIGHT * 0.75;

  const snapPoints =
    percentage < 0.6
      ? [fullSnapHeight, secondarySnapHeight, initialSnapHeight, closeHeight]
      : [fullSnapHeight, initialSnapHeight, closeHeight];

  const topAnimation = useSharedValue(closeHeight);
  const context = useSharedValue(0);

  const expand = useCallback(() => {
    topAnimation.value = withTiming(initialSnapHeight);
    onOpenHandler && onOpenHandler();
  }, [initialSnapHeight]);

  const close = useCallback(() => {
    topAnimation.value = withTiming(closeHeight);
    Keyboard.dismiss();
    onCloseHandler && onCloseHandler();
  }, [closeHeight]);

  useImperativeHandle(
    bottomSheetRef,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    top: topAnimation.value,
  }));

  const pan = Gesture.Pan()
    .onBegin(() => {
      if (!draggable) return;
      context.value = topAnimation.value;
    })
    .onUpdate((event) => {
      if (!draggable) return;
      const newPosition = context.value + event.translationY;
      topAnimation.value = Math.max(fullSnapHeight, newPosition);
    })
    .onEnd(() => {
      if (!draggable) return;

      const currentTop = topAnimation.value;

      // Find closest snap point
      let closest = snapPoints[0];
      let minDiff = Math.abs(currentTop - snapPoints[0]);

      for (let i = 1; i < snapPoints.length; i++) {
        const diff = Math.abs(currentTop - snapPoints[i]);
        if (diff < minDiff) {
          minDiff = diff;
          closest = snapPoints[i];
        }
      }

      topAnimation.value = withTiming(closest);
    });

  return (
    <>
      <BackDrop
        topAnimation={topAnimation}
        openHeight={initialSnapHeight}
        closeHeight={closeHeight}
        close={close}
        blur={blur}
        blurIntensity={blurIntensity}
        blurTint={blurTint}
        backdropColor={backdropColor}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[styles.container, animatedStyle, { backgroundColor }]}
        >
          <View style={styles.line_container}>
            {draggable && <View style={styles.line} />}
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 200,
    boxShadow: "2px 3px 20px rgba(226, 226, 226, 0.5)",
  },
  line_container: {
    alignItems: "center",
    marginBottom: 10,
  },
  line: {
    width: 40,
    height: 4,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
});

export default AppBottomSheet;
