import React, { useState, useMemo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { router } from "expo-router";
import Colors from "@/src/theme/colors";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

const FabTabs = () => {
  const { t } = useTranslation();

  const actions: IActionProps[] = useMemo(
    () => [
      {
        text: t("Calculators"),
        icon: (
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/calculator.png",
            }}
            style={{ width: 25, height: 25 }}
          />
        ),
        name: "calculators",
        position: 1,
        color: "#4CAF50",
      },
      {
        text: t("Spam Detection"),
        icon: (
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/block.png",
            }}
            style={{ width: 25, height: 25 }}
          />
        ),
        name: "spamDetection",
        position: 2,
        color: "#E91E63",
      },
      {
        text: t("Report Calls"),
        icon: (
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/phone.png",
            }}
            style={{ width: 25, height: 25 }}
          />
        ),
        name: "reportCalls",
        position: 3,
        color: "#FF9800",
      },
      {
        text: t("My Goals"),
        icon: (
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/goal.png",
            }}
            style={{ width: 25, height: 25 }}
          />
        ),
        name: "myGoals",
        position: 4,
        color: Colors.primaryCyanColor,
      },
    ],
    [t]
  );

  const [isOpen, setIsOpen] = useState(false);

  const handlePress = (name: string) => {
    setIsOpen(false);
    switch (name) {
      case "calculators":
        router.push("/calculators/all");
        break;
      case "spamDetection":
        router.push("/(main)/spamdetect");
        break;
      case "reportCalls":
        router.push("/(main)/calllogs");
        break;
      case "myGoals":
        router.push("/goals");
        break;
      default:
        console.warn("Unknown FAB action:", name);
    }
  };

  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        color={Colors.primaryCyanColor}
        distanceToEdge={{ vertical: verticalScale(60), horizontal: scale(20) }}
        overlayColor="rgba(0,0,0,0.5)"
        showBackground={true}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onPressItem={handlePress as any}
        floatingIcon={
          <Image
            source={{
              uri: isOpen
                ? "https://img.icons8.com/ios-filled/50/ffffff/multiply.png"
                : "https://img.icons8.com/ios-filled/50/ffffff/plus-math.png",
            }}
            style={{ width: 25, height: 25 }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default FabTabs;
