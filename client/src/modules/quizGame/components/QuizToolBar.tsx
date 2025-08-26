import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
} from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuizToolBar = () => {
  return (
    <View style={styles.toolbar_container}>
      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="chevron-back-sharp" size={28} color="white" />
      </TouchableOpacity> */}

      <View style={styles.title_wrapper}>
        <Text
          style={[styles.quiz_letter, { fontSize: 40, color: Colors.yellow }]}
        >
          Q
        </Text>
        <Text style={[styles.quiz_letter, { color: "red" }]}>U</Text>
        <Text style={[styles.quiz_letter, { color: "orange" }]}>I</Text>
        <Text style={[styles.quiz_letter, { color: Colors.purpleLight }]}>
          Z
        </Text>
      </View>

      {/* <Ionicons name="chevron-back-sharp" size={28} color="transparent" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(16),
  },
  title_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: scale(4),
  },
  quiz_letter: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(32),
    // lineHeight: moderateScale(32),
  },
});

export default QuizToolBar;
