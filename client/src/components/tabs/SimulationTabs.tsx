import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "@/src/theme/colors";
import CustomToolbar from "../toolBars/mainToolBar";
import AppSafeAreaView from "../viewWrappers/AppSafeAreaView";
import {
  NavigationState,
  Route,
  ParamListBase,
} from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import AppLinearGradient from "../shared/AppLinearGradient";
import { StatusBar } from "expo-status-bar";

type TabBarDescriptor = {
  options: BottomTabNavigationOptions & { title?: string };
  navigation: any;
  route: Route<string>;
};

type SimulationTabsProps = {
  state: NavigationState<ParamListBase>;
  descriptors: {
    [key: string]: TabBarDescriptor;
  };
  navigation: any;
};

const SimulationTabs: React.FC<SimulationTabsProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <AppLinearGradient
        colors={[
          Colors.primaryCyanColor,
          Colors.gradientCyanSecondary,
          // Colors.white,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.8]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0 }} />
      <CustomToolbar
        backgroundColor={"transparent"}
        textColor="white"
        rightIcon={true}
        streak={true}
      />

      <View style={styles.tabContainer}>
        {state.routes.map((route: Route<string>, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = options.title || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused
                  ? Colors.yellowPrimary
                  : Colors.textSecondaryDark,
                size: 24,
              })}
              <Text style={[styles.tabText, isFocused && styles.activeTabText]}>
                {label}
              </Text>
              {isFocused && (
                <AppLinearGradient
                  colors={[Colors.darkYellow, Colors.darkYellow]}
                  style={styles.underline}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.white,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.divider,
    justifyContent: "space-around",
    paddingTop: 8,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: Colors.textSecondaryLight,
    fontFamily: "Quicksand-SemiBold",
  },
  activeTabText: {
    color: Colors.textPrimary,
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: "100%",
    borderRadius: 4,
  },
});

export default SimulationTabs;
