import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/theme/colors";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";

const FloatingFabAddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const calculatorSpin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const menuItems = [
    { icon: "calculator-outline", label: "Calculators", color: "#4CAF50" },
    { icon: "shield-outline", label: "Spam Detection", color: "#FF9800" },
    { icon: "alert-circle-outline", label: "Report", color: "#F44336" },
    { icon: "settings-outline", label: "Settings", color: "#2196F3" },
  ];

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const translateY = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(index + 1) * 60],
            });

            return (
              <Animated.View
                key={item.label}
                style={[
                  styles.menuItem,
                  {
                    transform: [{ translateY }],
                    backgroundColor: item.color,
                  },
                ]}
              >
                <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color="white"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        style={styles.mainButton}
        onPress={toggleMenu}
        activeOpacity={1}
      >
        <Animated.View style={{ transform: [{ rotate: calculatorSpin }] }}>
          <Ionicons name="add" size={28} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // right: 20,
    // bottom: 20,
    // alignItems: "flex-end",
  },
  mainButton: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: Colors.primaryCyanColor,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    bottom: 70,
  },
  menuItem: {
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Quicksand-Medium",
    includeFontPadding: false,
  },
});

export default FloatingFabAddButton;
