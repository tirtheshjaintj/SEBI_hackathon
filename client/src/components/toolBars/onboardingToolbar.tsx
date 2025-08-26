import Colors from "@/src/theme/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
const OnboardingToolbar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        activeOpacity={0.5}
        style={styles.icon_container}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 30 },
  icon_container: {
    backgroundColor: Colors.whiteDim,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
  },
});

export default OnboardingToolbar;
