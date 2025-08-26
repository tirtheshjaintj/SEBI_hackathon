import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import { HapticTab } from "@/src/components/tabs/HapticTab";
import BlurTabBarBackground from "@/src/components/tabs/TabBarBackground.ios";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryCyanColor,
        tabBarInactiveTintColor: Colors.textSecondaryDark,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 20,
        },
        tabBarButton: HapticTab,
        tabBarBackground: BlurTabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: "#fff",
            position: "absolute",
          },
          default: {
            backgroundColor: "#ffffff",
            paddingHorizontal: 8,
            paddingVertical: 8,
            minHeight: verticalScale(65),
          },
        }),
      }}
    >
      <Tabs.Screen
        name="community"
        options={{
          title: t("Community"),
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={!focused ? "people" : "people-alt"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: t("Budget"),
          animation: "none",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "wallet" : "wallet-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          animation: "none",
          title: "",
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  router.navigate("/home", {});
                }}
              >
                <AppLinearGradient
                  colors={[
                    Colors.primaryCyanColor,
                    Colors.gradientCyanSecondary,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.2, 0.7]}
                  style={styles.home_tab}
                >
                  {focused ? (
                    <Ionicons name="home" size={28} color="white" />
                  ) : (
                    <Ionicons name="home-outline" size={28} color="white" />
                  )}
                </AppLinearGradient>
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          title: t("Quiz"),
          animation: "none",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="brain" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(simulation)"
        options={{
          title: t("Simulations"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="safety-goggles"
              size={29}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  home_tab: {
    position: "absolute",
    top: verticalScale(-40),
    bottom: 0,
    borderRadius: moderateScale(50),
    width: scale(55),
    height: scale(55),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: "auto",
    boxShadow: "2px 3px 20px rgba(226, 226, 226, 0.5)",
  },

  tab_icon: {
    width: scale(30),
    borderRadius: moderateScale(50),
  },
});
